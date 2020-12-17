import React from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, Card, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import { getPage } from '../../utils/auth';
import '../../utils/config'
import { login } from '../../services/login'
//import { getJwtUser } from '../../utils/jwtHelper';

class Login extends React.Component {

  onFinish = values => {
    // e.preventDefault();
    login({
      username: values.username,
      password: values.password,
      entryID: this.props.location.state.entryID
    }).then(res => {
      //console.log(res)
      if (res.result) {
        window.localStorage.isSSO = false
        getPage(res.data, this.props.history)
      } else {
        message.error(res.message);
      }
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
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Form.Item> */}
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