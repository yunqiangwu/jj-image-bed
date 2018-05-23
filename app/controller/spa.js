module.exports = app => class SPAController extends app.Controller {
  async client() {
    const {
      ctx
    } = this;
    await ctx.renderClient('client.js', {});
  }

  async redux() {
    const {
      ctx
    } = this;
    await ctx.renderClient('redux.js', {});
  }

  async ssr() {
    const {
      ctx
    } = this;
    await ctx.render('ssr.js', {
      url: ctx.url,
      csrf: ctx.csrf,
      data: 334
    });
  }

};
