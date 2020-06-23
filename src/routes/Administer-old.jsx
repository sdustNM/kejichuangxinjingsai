import React from 'react'
import { Layout, Space, Menu } from 'antd'
import { Route, Redirect, Switch } from 'react-router-dom'
import logo from '../../components/frame/logo.png'
import { isAdminister } from '../utils/auth'

import { administerRoutes } from '../../routes/index'
import NoPermission from '../views/common/NoPermission'
const { Header, Content, Sider, Footer } = Layout
const { SubMenu } = Menu

export default class Administer extends React.Component {
  render() {
    return (
      isAdminister() ? (
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
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={['competition']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu
                  key="competition"
                  title={
                    <span>
                      <span><strong>比赛管理</strong></span>
                    </span>
                  }
                >
                  <Menu.Item
                    key="1"
                    onClick={() => this.props.history.push('/administer/competitions')}
                  >
                    比赛信息
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="project"
                  title={
                    <span>
                      <span><strong>项目管理</strong></span>
                    </span>
                  }
                >
                  <Menu.Item
                    key="2"
                    onClick={() => this.props.history.push('/administer/projects')}
                  >
                    参赛信息
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="system"
                  title={
                    <span>
                      <span><strong>系统管理</strong></span>
                    </span>
                  }
                >
                  <Menu.Item
                    key="3"
                    onClick={() => this.props.history.push('/administer/departments')}
                  >
                    部门信息
                  </Menu.Item>
                  <Menu.Item
                    key="4"
                    onClick={() => this.props.history.push('/administer/administers')}
                  >
                    管理信息
                  </Menu.Item>
                  <Menu.Item
                    key="5"
                    onClick={() => this.props.history.push('/administer/teachers')}
                  >
                    教师信息
                  </Menu.Item>
                  <Menu.Item
                    key="6"
                    onClick={() => this.props.history.push('/administer/students')}
                  >
                    学生信息
                  </Menu.Item>
                </SubMenu>

              </Menu>
            </Sider>
            <Layout style={{ padding: '16px' }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 0,
                  margin: 0,
                  minHeight: 280,
                  background: '#fff'
                }}
              >
                <Switch>
                  {
                    administerRoutes.map(route =>
                      <Route
                        key={route.path}
                        path={route.path}
                        component={route.component}
                        exact
                      ></Route>)
                  }
                  <Redirect to='/error'></Redirect>
                </Switch>
              </Content>
            </Layout>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>
            山东科技大学科技创新竞赛 ©2018 Created by 网信办
          </Footer>
        </Layout>
      ) : <NoPermission></NoPermission>
    )
  }
}