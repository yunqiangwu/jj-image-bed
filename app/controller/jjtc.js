const QiniuHelper = require('../util/QiniuHelper');
const path = require('path');

const CONFIG_KEY = 'jjtc___key';


module.exports = app => class SPAController extends app.Controller {

  async saveConfig() {
    const {
      ctx
    } = this;
    const {
      body
    } = ctx.request;
    const qiniuHelper = new QiniuHelper();

    if(body && body.ak && body.sk && body.domain){
      const getConfigUrl = await qiniuHelper.uploadString(CONFIG_KEY, JSON.stringify(body));
      const result = await app.curl(getConfigUrl);
      console.log(result.data);
      ctx.body = {
        success: true,
        data: body
      };
    }else{
      ctx.body = {
        success: false,
        message: '参数错误'
      };
    }
  }

  async getConfig() {
    const {
      ctx
    } = this;
    const {
      body
    } = ctx.request;
    const qiniuHelper = new QiniuHelper();
    const getConfigUrl = qiniuHelper.getPublicDownloadUrl(CONFIG_KEY);
    const result = await app.curl(getConfigUrl);
    console.log(result.data);
    ctx.body = JSON.parse(result.data);
  }

  // async getCsrf() {
  //   const {
  //     ctx
  //   } = this;
  //   ctx.body = ctx.csrf;
  // }

  async uploadFile() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const name = path.basename(stream.filename);
    const qiniuHelper = new QiniuHelper();
    const result = await qiniuHelper.uploadFile(name, stream);
    ctx.body = {
      url: result,
      name
    };
  }

  async listFile() {
    const ctx = this.ctx;
    const qiniuHelper = new QiniuHelper();
    const result = await qiniuHelper.listPrefix(ctx.request.query);
    ctx.body = result;
  }

}; 