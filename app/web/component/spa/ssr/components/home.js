import React, { Component } from 'react';
import { Upload, Icon, message, Divider, Input, Modal } from 'antd';
import { getConfig, saveConfig } from '../services/config';

const Dragger = Upload.Dragger;

class Home extends Component {
  constructor(props) {
    super(props);
    const filList = getConfig('fileList')||[];
    this.state = {
      list: filList,
      loading: false
    };
  }

  componentDidMount() {
    if(this.state.list.length === 0) {
      this.setState({
        loading: true
      })
      fetch('/api/jjtc/list-file', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data=>data.json()).then((data)=>{
        console.log(data);
        // message.success('保存成功！');
        // saveConfig(data);
        this.setState({
          list: data.rows,
          loading: false
        });
      },(err)=>{
        Modal.error({
          title: err.message
        });
        this.setState({
          loading: false
        });
      });
    }
  }

  componentWillUnmount() {
    saveConfig(this.state.list,'fileList');
  }

  handleAddFile = (fileItem) => {
    this.setState({
      list: [fileItem, ...this.state.list]
    });
  }

  handleDelete = (item) => {
    this.setState({
      list: this.state.list.filter(_ => _ !== item)
    });
  }

  handlePreview = (item) => {
    Modal.info({
      title: item.name,
      width: 1000,
      content: (
        <img style={{ width: '100%'}} src={item.url} alt={item.name}/>
      )
    });
  }

  render() {
    const draggerProps = {
      name: 'file',
      multiple: true,
      className: 'redux-btn-add',
      action: '/api/jjtc/upload',
      onChange: (info) => {
        const status = info.file.status;
        console.log(info);
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
          this.handleAddFile(info.file.response);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    };

    return (<div className="redux-nav-item">
      <h3 style={{ marginTop: 8 }}>简简图床</h3>
      {/* <Divider /> */}
      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">拖拽图片到这里上传</p>
        <p className="ant-upload-hint" />
      </Dragger>
      <div className="container">
        <div className="row row-offcanvas row-offcanvas-right">
          <div className="col-xs-12 col-sm-9">
            <div className="smart-artiles" id="articleList">
              { 
                this.state.list.map((item, index) => {
                  return (
                    <div key={item.url} className="img-box">
                      <img onClick={()=>this.handlePreview(item)} src={item.url} alt={item.name} />
                      <div>
                        <Input value={item.url} readOnly suffix={(
                          <Icon type='delete' onClick={()=>this.handleDelete(item)}/>                        
                        )} />
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default Home;
