const QiniuHelper = require('../app/util/QiniuHelper');
const path = require('path');
const assert = require('assert');

// console.log(QiniuHelper);


describe('QiniuHelper', () => {
  const qiniuHelper = new QiniuHelper();

  // describe('#uploadFile(key, localFile)', () => {
  //   it('上传文件', (done) => {
  //     const fileKey = 'file.gif';
  //     const filePath = path.resolve(__dirname, './files/file.gif');
  //     qiniuHelper.uploadFile(fileKey, filePath).then((fileUrl) => {
  //       console.log(fileUrl);
  //       done();
  //     }, (err) => {
  //       console.error(err);
  //       done();
  //     });
  //   });
  // });

  // describe('#listPrefix(prefix)', () => {
  //   it('文件列表文件', (done) => {
  //     // const prefix = 'file.gif';
  //     qiniuHelper.listPrefix().then((filesInfo) => {
  //       console.log(filesInfo);
  //       done();
  //     }, (err) => {
  //       console.error(err);
  //       done();
  //     });
  //   });
  // });


  // describe('#getFileState(key)', () => {
  //   it('获取文件状态', (done) => {
  //     const key = 'file33.gif';
  //     qiniuHelper.getFileState(key).then((filesInfo) => {
  //       console.log('success: ',filesInfo);
  //       done();
  //     }, (err) => {
  //       console.error('error: ',err);
  //       done();
  //     });
  //   });
  // });

  describe('#uploadString(key,str)', () => {
    it('上传字符串', (done) => {
      const key = 'file33gif';
      const str = 'abcdefg';
      qiniuHelper.uploadString(key, str).then((res) => {
        console.log('success: ',res);
        done();
      }, (err) => {
        console.error('error: ',err);
        done();
      });
    });
  });


});
