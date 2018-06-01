const qiniu = require('qiniu');
const fs = require('fs');
const stream = require('stream');



const defaultOptions = {
  ak: 'aroRRNOX0hnzrAxDv4G1I76a1Ygr18zGsg0D7kJn',
  sk: 'vnFMDUjInrTPwtQPW7CfQ0WQNIrgz0l9uMFYDGtu',
  bucket: 'temp',
  domain: 'http://temp.jajabjbj.top',
  prefix: 'default_pic'
};

class QiniuHelper {
  constructor(_options) {
    const options = Object.assign({}, defaultOptions, _options);
    const mac = new qiniu.auth.digest.Mac(options.ak, options.sk);
    this.mac = mac;
    const config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone[options.zone]||qiniu.zone.Zone_z0;
    this.config = config;
    this._options = options;
    this.qiniu = qiniu;
  }

  /**
   * 获取文件key
   * @param {String} key 文件key
   */
  getRealKey(key) {
    const dotIndex = key.lastIndexOf('.');
    let realKey;
    if (dotIndex !== -1) {
      const fileName = key.slice(0, dotIndex);
      const extName = key.slice(dotIndex, key.length);
      realKey = `${this._options.prefix}/${fileName}__${new Date().getTime()}${extName}`;
    } else {
      realKey = `${this._options.prefix}/${key}__${new Date().getTime()}`;
    }
    return realKey;
  }

  /**
   * 获取文件token
   */
  getToken() {
    const options = {
      scope: this._options.bucket
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(this.mac);
    return uploadToken;
  }


  getFormUploader() {
    if (!this.formUploader) {
      this.formUploader = new qiniu.form_up.FormUploader(this.config);
    }
    return this.formUploader;
  }

  getBucketManager() {
    if (!this.bucketManager) {
      this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config);
    }
    return this.bucketManager;
  }

  /**
   * 获取文件的访问地址
   * @param {String} key 文件的key
   */
  getPublicDownloadUrl(key){
    const bucketManager = this.getBucketManager();
    const publicBucketDomain = this._options.domain;
    // 公开空间访问链接
    const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
    return publicDownloadUrl;
  }

  /**
   * 上传文件到七牛云
   * @param {String} key 
   * @param {String|Stream} localFile 文件地址 或 文件输入流对象
   * @param {Boolean} isConverKey 是否转化key，转化即再文件后面加时间戳
   */
  uploadFile(key, localFile, isConverKey = true) {
    var readableStream;
    if(typeof localFile === 'string'){
      readableStream = fs.createReadStream(localFile);
    }else{
      readableStream = localFile;
    }
    const formUploader = this.getFormUploader();
    const putExtra = new qiniu.form_up.PutExtra();
    const uploadToken = this.getToken();
    const realKey = isConverKey ? this.getRealKey(key) : key;
    return new Promise((resolve, reject) => {
      // 文件上传
      formUploader.putStream(uploadToken, realKey, readableStream, putExtra, (
        respErr,
        respBody, respInfo
      ) => {
        if (respErr) {
          reject(respErr);
          return;
        }
        if (respInfo.statusCode == 200) {
          const bucketManager = this.getBucketManager();
          const publicBucketDomain = this._options.domain;
          // 公开空间访问链接
          const publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, realKey);
          resolve(publicDownloadUrl);
        } else {
          reject(respBody);
        }
      });
    });
  }

  /**
   * 保存一段字符串
   * @param {String} key 
   * @param {String} str 字符串内容
   */
  uploadString(key, str) {
    var readableStream;
    // 创建一个bufferstream
    var bufferStream = new stream.PassThrough();
    //将Buffer写入
    bufferStream.end(new Buffer(str));
    return this.uploadFile(key, bufferStream, false);
  }


  /**
   * 列车指定前缀的文件集合
   * @param {} param0 
   */
  listPrefix({
    prefix = this._options.prefix,
    pageSize = 10,
    offset
  } = {}) {
    const bucketManager = this.getBucketManager();
    // @param options 列举操作的可选参数
    //                prefix    列举的文件前缀
    //                marker    上一次列举返回的位置标记，作为本次列举的起点信息
    //                limit     每次返回的最大列举文件数量
    //                delimiter 指定目录分隔符
    const options = {
      limit: pageSize,
      prefix,
      marker: offset
    };

    return new Promise((resolve, reject) => {
      bucketManager.listPrefix(this._options.bucket, options, (err, respBody, respInfo) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (respInfo.statusCode == 200) {
          // 如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
          // 指定options里面的marker为这个值
          // var nextMarker = respBody.marker;
          // var commonPrefixes = respBody.commonPrefixes;
          // console.log(nextMarker);
          // console.log(commonPrefixes);
          // var items = respBody.items;
          // items.forEach(function (item) {
          //   console.log(item.key);
          //   // console.log(item.putTime);
          //   // console.log(item.hash);
          //   // console.log(item.fsize);
          //   // console.log(item.mimeType);
          //   // console.log(item.endUser);
          //   // console.log(item.type);
          // });
          // console.log(respInfo);
          resolve({
            rows: respBody.items.map(item => ({ ...item, name: item.key.replace(this._options.prefix+'/', ''), url: this.getPublicDownloadUrl(item.key)})),
            offset: respBody.marker
          });
        } else {
          reject(respBody);
        }
      });
    });
  }

  /**
   * 获取某个文件状态
   * @param {String} key 文件key
   */
  getFileState(key) {
    const bucketManager = this.getBucketManager();
    // @param options 列举操作的可选参数
    //                prefix    列举的文件前缀
    //                marker    上一次列举返回的位置标记，作为本次列举的起点信息
    //                limit     每次返回的最大列举文件数量
    //                delimiter 指定目录分隔符
    return new Promise((resolve, reject) => {
      bucketManager.stat(this._options.bucket, key, function(err, respBody, respInfo) {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (respInfo.statusCode == 200) {
          resolve(respBody);
        } else {
          reject(respBody);
        }
      });
    });
  }

  /**
   * 更新配置
   */
  updateConfig(_options) {
    const options = Object.assign({}, defaultOptions, _options);
    const mac = new qiniu.auth.digest.Mac(options.ak, options.sk);
    this.mac = mac;
    const config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone[options.zone]||qiniu.zone.Zone_z0;
    this.config = config;
    this._options = options;
    this.qiniu = qiniu;
  }
}

module.exports = QiniuHelper;
