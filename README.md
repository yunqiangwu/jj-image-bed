---
title: 服务器端渲染程序 demo 图床
date: 2018-5-20
---
## 服务器端渲染程序 demo 图床

> Github: https://github.com/yunqiangwu/jj-image-bed.git

基于 Egg + React + Webpack3 + 七牛云存储 单页面服务端渲染同构工程图床`Demo`项目

- Egg 版本： ^2.x.x
- Node 版本: Node ^8.x.x+
- Webpack 版本: ^3.10.0, 对应 `easywebpack-react` 版本为 3.6.0
- React 版本: ^15.0.0, ^16.0.0, 
- qiniu 版本: 7.1.7


### 特性

- 基于 React 单页面服务端客户端同构实现

- 支持服务端渲染 `render` 和纯前端渲染 `renderClient`

- 支持 react-router, react-redux 服务端/客户端单页面渲染

- Node 8 版本的 async 和 await 特性, Controller 采用 class 方式编写

- 图片保存到七牛云

- 拖拽上传图片


### 依赖

- [easywebpack](https://github.com/hubcarl/easywebpack) ^3.5.3
- [easywebpack-react](https://github.com/hubcarl/easywebpack-react) ^3.5.0
- [egg-view-react-ssr](https://github.com/hubcarl/egg-view-react-ssr) ^2.1.0
- [egg-webpack](https://github.com/hubcarl/egg-webpack) ^2.4.6
- [egg-webpack-react](https://github.com/hubcarl/egg-webpack-react) ^2.0.0

![](http://7xsjnn.com2.z0.glb.clouddn.com/15271170207529.jpg)




### 使用


##### Clone 项目

```bash
git clone https://github.com/yunqiangwu/jj-image-bed.git
```

##### 安装依赖

```bash
npm install
npm start
```

##### 启动应用

```bash
npm start
```

应用访问: http://127.0.0.1:7001

![](http://7xsjnn.com2.z0.glb.clouddn.com/15271170561959.png)


##### 项目构建

```bash
// 直接运行(编译文件全部在内存里面,本地开发使用)
npm start

// 编译文件到磁盘打包使用(发布正式环境)
npm run build 或者 easywebpack build prod
```

##### 项目截图

![](http://7xsjnn.com2.z0.glb.clouddn.com/15271168264465.jpg)
---
![](http://7xsjnn.com2.z0.glb.clouddn.com/15271169015438.jpg)


### License

[MIT](LICENSE)




