module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/public/",n(n.s=22)}({0:function(e,t){("object"==typeof e&&"object"==typeof e.exports?e.exports:window).noop=function(){}},1:function(e,t){e.exports=require("react")},2:function(e,t){e.exports=require("react-router-dom")},22:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n.n(r),o=n(3),c=n.n(o),l=n(2),u=(n.n(l),n(5)),i=(n.n(u),n(9)),s=function(){return a.a.createElement(l.BrowserRouter,null,a.a.createElement("div",null,a.a.createElement(i.a,null),a.a.createElement("h2",null,"Official Site"),a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement(l.Link,{to:"/client/"},"Home")),a.a.createElement("li",null,a.a.createElement(l.Link,{to:"/client/product"},"Product")),a.a.createElement("li",null,a.a.createElement(l.Link,{to:"/client/about"},"About"))),a.a.createElement(l.Route,{path:"/client/:id?",component:p})))},p=function(e){var t=e.match;return a.a.createElement("div",null,a.a.createElement("h3",null,"ID: ",t.params.id))},f=function(){return a.a.createElement(s,null)};c.a.render(a.a.createElement(f,null),document.getElementById("app"));"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(s,"App","/Users/wuyun/work/test/test-egg-react2/app/web/page/client/client.jsx"),__REACT_HOT_LOADER__.register(p,"Child","/Users/wuyun/work/test/test-egg-react2/app/web/page/client/client.jsx"),__REACT_HOT_LOADER__.register(f,"Client","/Users/wuyun/work/test/test-egg-react2/app/web/page/client/client.jsx"))},3:function(e,t){e.exports=require("react-dom")},5:function(e,t){e.exports=require("react-hot-loader")},9:function(e,t,n){"use strict";var r=n(1),a=n.n(r),o=n(0),c=(n.n(o),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}());var l=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r["Component"]),c(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return a.a.createElement("header",{className:"header"},a.a.createElement("div",{className:"container"},a.a.createElement("h1",null,a.a.createElement("a",{href:"/",className:"router-link-active"},"Egg+React")),a.a.createElement("ul",{className:"nav"},a.a.createElement("li",{className:"nav-item"},a.a.createElement("a",{href:"/client"},"SPA-CSR")),a.a.createElement("li",{className:"nav-item"},a.a.createElement("a",{href:"/redux"},"SPA-CSR-REDUX")),a.a.createElement("li",{className:"nav-item"},a.a.createElement("a",{href:"/ssr"},"SPA-SSR-REDUX")))))}}]),t}(),u=l;t.a=u;"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(l,"Header","/Users/wuyun/work/test/test-egg-react2/app/web/component/header/header.jsx"),__REACT_HOT_LOADER__.register(u,"default","/Users/wuyun/work/test/test-egg-react2/app/web/component/header/header.jsx"))}});