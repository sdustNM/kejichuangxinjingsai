import React from 'react';
import { Redirect } from 'react-router-dom'
import { Form, Input, Button, Card, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getRole, setToken } from '../../utils/auth'
import './login.css'

class Login extends React.Component {

  onFinish = values => {
    console.log('Received values of form: ', values);
    setToken(values.username)
  }

  render() {
    return getRole() ? (
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
    ) : (<Redirect to="/"/>)
  }
}


export default Login;