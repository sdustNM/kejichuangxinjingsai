import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Space,Dropdown, Avatar } from 'antd'
import { studentRoutes } from '../../routes'
import {getJwtUser,removeJwt} from '../../utils/jwtHelper'
import logo from './logo.png'
import './MyLayout.css'
const { Header, Content, Sider, Footer } = Layout;
const routes = studentRoutes.filter(route => route.isShow)
class MyLayout extends React.Component {




  popMenu=()=>
  {
    return (
    <Menu  onClick={p=>{
      if (p.key==="logout"){
        removeJwt();
        this.props.history.push("/login");
      }
    }}>
      <Menu.Item key="notice">通知中心</Menu.Item>
      <Menu.Item key="logout">退出</Menu.Item>
    </Menu>
    );
  }

  render() {
    return (
      <Layout>
        <Header className="header" style={{ backgroundColor: '#1890ff' }}>
          <div className="logo">
            <Space size={50}>
              <img src={logo} alt='logo' height='48px'></img>
              <span style={{
                color: 'white',
                fontSize: '32px'
              }}>大学生科技创新竞赛</span>
            </Space>
          </div>
          <Dropdown overlay={this.popMenu}>
            <div>
              <Avatar>U</Avatar>
              <span style={{color:'#fff'}}>{ `${getJwtUser().role}[${getJwtUser().username}]` }</span>
              
            </div>
          </Dropdown>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['/student/']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                routes.map(route => {
                  return (
                    <Menu.Item
                      key={route.path}
                      onClick={p => this.props.history.push(p.key)}>
                      {route.icon}{route.title}
                    </Menu.Item>
                  )
                })
              }
              {/* <Menu.Item key="1">
              <Menu.Item key="2">
                <Link to='/student/competitions'>竞赛通知</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to='/student/joined'>我的竞赛</Link>
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>??</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              className="site-layout-background"
              style={{
                padding: 0,
                margin: 0,
                minHeight: 280,
                background: '#fff'
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          山东科技大学科技创新竞赛 ©2018 Created by 网信办
          </Footer>
      </Layout>
    )
  }

}

export default withRouter(MyLayout);