import React, { Component } from 'react';
import { Form, Select, Input, Button, Modal, message } from 'antd';
import {getConfig, saveConfig} from '../services/config';

const FormItem = Form.Item;
const Option = Select.Option;


class Setting extends Component {

  state = {
    loading: false
  };
  componentDidMount(){
    const config = getConfig();
    if(config && config.ak && config.sk && config.domain){
      this.props.form.setFieldsValue(config);
    }else{
      this.setState({
        loading: true
      });
      fetch('/api/jjtc/get-config', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(data=>data.json()).then((data)=>{
        console.log(data);
        this.props.form.setFieldsValue(data);
        // message.success('保存成功！');
        saveConfig(data);
        this.setState({
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
      this.setState({
        loading: true
      });
      fetch('/api/jjtc/save-config', {
        body: JSON.stringify(values),          
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        }
      }).then(data=>data.json()).then((data)=>{
        saveConfig(values);
        message.success('保存成功！');
        this.setState({
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
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ margin: 16 }}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="空间名称"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('bucket', {
              rules: [{ required: true, message: 'Please input your 空间名称!' }]
            })(<Input placeholder="空间名称" />)}
          </FormItem>
          <FormItem
            label="AK"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('ak', {
              rules: [{ required: true, message: 'Please input your Access Key!' }]
            })(<Input placeholder="Access Key" />)}
          </FormItem>
          <FormItem
            label="SK"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('sk', {
              rules: [{ required: true, message: 'Please input your Secret Key!' }]
            })(<Input placeholder="Secret Key" />)}
          </FormItem>
          <FormItem
            label="域名"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('domain', {
              rules: [{ required: true, message: 'Please input your 空间访问域名!' }]
            })(<Input placeholder="空间访问域名，例如 http://xxxxx.z0.glb.clouddn.com" />)}
          </FormItem>
          <FormItem
            label="机房地区"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator('zone', {
              initialValue: 'Zone_z0',
              rules: [{ required: true, message: 'Please select your zone!' }]
            })(<Select
            >
              <Option value="Zone_z0">华东</Option>
              <Option value="Zone_z1">华北</Option>
              <Option value="Zone_z2">华南</Option>
              <Option value="Zone_na0">北美</Option>
            </Select>)}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 5 }}
          >
            <Button type="primary" htmlType="submit" loading={this.state.loading}>
            保存
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}


const WrappedApp = Form.create()(Setting);

export default WrappedApp;
