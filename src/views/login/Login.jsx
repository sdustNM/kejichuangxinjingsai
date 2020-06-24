import React from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, Card, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import axios from 'axios'
import { getRoleName,getRole } from '../../utils/auth';

class Login extends React.Component {

  onFinish = values => {
    // e.preventDefault();
    axios.post('http://192.168.34.201:4000/api/login', {
      username: values.username,
      password: values.password,
      entryID: this.props.location.state.entryID
    }).then(res => {
<<<<<<< HEAD
      if (res.data.result) {
        sessionStorage.setItem('myjwt', res.data.data);
        if (this.props.location.state.entryID === 1) {
          this.props.history.push('/administer')
        } else if (this.props.location.state.entryID === 2) {
          this.props.history.push('/expert')
        } else {
          this.props.history.push('/student')
        }
      }
      else{
        alert(res.data.message) 
        this.props.history.push('/')
      }


=======
        let r=res.data;
      // console.log(res.data.data)
      if (r.result) {
        sessionStorage.setItem('myjwt', r.data);
        if (getRoleName() === "学生") {
          this.props.history.push('/student')
        }
        else if (getRoleName() === "管理员") {
          this.props.history.push('/administer')
        }
        else {
          this.props.history.push('/Expert')
        }
      }
      else 
      {
        message.error(r.message);
      }
>>>>>>> cafe972d4993e52a37813869aa05391d41973176
    }).catch(() => this.setState({
      error: true
    }));
  }

  render() {
    return this.props.location.state ? (
      <div className='container'>
        <Card
          title='系统登录'
          className="login-form"
          headStyle={{ backgroundColor: '#1890ff' }}
        >
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
        </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    ) : (<Redirect to="/" />)
  }
}


export default Login;