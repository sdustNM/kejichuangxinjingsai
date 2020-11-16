import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Space, Dropdown, Avatar } from 'antd'

import { studentMenus } from '../../routes/StudentMenu'
import { administerMenus } from '../../routes/AdministerMenu'
import { expertMenus } from '../../routes/ExpertMenu'
import { getJwtUser, removeJwt } from '../../utils/jwtHelper'
import logo from '../../assets/images/logo.png'
import './MyLayout.css'
import { isStudent, isExpert, getRoleName, isAdminister, getRoleList } from '../../utils/auth'
import {appRoot}   from   '../../utils/request';
import '../../utils/config'
import { UserOutlined } from '@ant-design/icons'
import RoleSelecter from './RoleSelecter'
const { Header, Content, Sider, Footer } = Layout;
const { SubMenu } = Menu;



class MyLayout extends React.Component {

  popMenu = () => {
    return (
      <Menu onClick={p => {
        if (p.key === "logout") {
          removeJwt();
          if(window.localStorage.isSSO === 'true'){
            window.location.href = `${appRoot}/api/logout`
          }
          else{
            this.props.history.push('/login')
          }
        }
      }}>
        <Menu.Item key="notice">通知中心</Menu.Item>
        <Menu.Item key="logout">退出</Menu.Item>
      </Menu>
    );
  }

  render() {
    let currentMenu = isStudent() ? studentMenus : (isExpert() ? expertMenus : administerMenus);
    let menus = currentMenu ? currentMenu.filter(m => m.isShow) : [];
    if (isAdminister()) {
      menus = menus.filter(m => m.yuanManager);
      menus.forEach(element => {
        element.sub = element.sub.filter(n => n.yuanManager)
      });
    }

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

          <Space>
            {getRoleList().length > 1 && <RoleSelecter history={this.props.history} />}
            <Dropdown overlay={this.popMenu}>
              <div>
                <Avatar icon={<UserOutlined />} />
                <span style={{ color: '#fff' }}>{`${getRoleName()}[${getJwtUser().username}]`}</span>

              </div>
            </Dropdown>
          </Space>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultOpenKeys={openKeys}
              style={{ height: '100%', borderRight: 0 }}
            >
              {

                menus.map(m => {
                  if (m.sub) {
                    return (
                      <SubMenu key={m.path} icon={m.icon} title={m.title}>
                        {
                          m.sub.map(y => {
                            return (
                              <Menu.Item key={y.path} icon={y.icon}
                                onClick={p => this.props.history.push({ pathname: p.key, state: { myid: 1 } })}
                              >  {y.title} </Menu.Item>
                            );
                          })
                        }
                      </SubMenu>
                    );
                  }
                  else {
                    return (
                      <Menu.Item
                        key={m.path}
                        onClick={p => this.props.history.push(p.key)}>
                        {m.icon}{m.title}
                      </Menu.Item>
                    )
                  }
                })
              }

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
          山东科技大学科技创新竞赛 ©2020
          </Footer>
      </Layout>
    )
  }

}

export default withRouter(MyLayout);