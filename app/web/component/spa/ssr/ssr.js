import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Home from 'component/spa/ssr/components/home';
import About from 'component/spa/ssr/components/about';
import Setting from 'component/spa/ssr/components/setting';

import { Menu, Icon } from 'antd';

const tabKey = { '/spa/ssr': 'home', '/spa/ssr/about': 'about' };
class App extends Component {
  constructor(props) {
    super(props);
    const { url, csrf } = props;
    this.state = { current: tabKey[url] };
    global.csrf = csrf;
    // fetch('/api/jjtc/get-csrf', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(data=>data.text()).then((text)=>{
    //   window._csrf = text;
    // });
  }

  handleClick(e) {
    console.log('click ', e, this.state);
    this.setState({
      current: e.key
    });
  }

  render() {
    return (<div>
      <Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="home">
          <Link to="/ssr">图床首页</Link>
        </Menu.Item>
        <Menu.Item key="setting">
          <Link to="/ssr/setting">设置</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/ssr/about">关于</Link>
        </Menu.Item>
      </Menu>
      <Switch>
        <Route path="/ssr/about" component={About} />
        <Route path="/ssr/setting" component={Setting} />
        <Route path="/ssr" component={Home} />
      </Switch>
    </div>);
  }
}

export default App;
