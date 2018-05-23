
module.exports = (app) => {
  app.redirect('/', '/ssr', 302);
  // app.get('/redux(/.+)?', app.controller.spa.redux);
  // app.get('/client(/.+)?', app.controller.spa.client);
  app.get('/ssr(/.+)?', app.controller.spa.ssr);

  app.post('/api/jjtc/save-config', app.controller.jjtc.saveConfig);
  app.get('/api/jjtc/get-config', app.controller.jjtc.getConfig);
  // app.get('/api/jjtc/get-csrf', app.controller.jjtc.getCsrf);
  app.post('/api/jjtc/upload', app.controller.jjtc.uploadFile);
  app.get('/api/jjtc/list-file', app.controller.jjtc.listFile);
  
  
};
