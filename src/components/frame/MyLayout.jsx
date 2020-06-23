import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Space,Dropdown, Avatar } from 'antd'

import {studentMenus} from '../../routes/StudentMenu'
import {administerMenus} from '../../routes/AdministerMenu'
import {getJwtUser,removeJwt} from '../../utils/jwtHelper'
import logo from './logo.png'
import './MyLayout.css'
import { isStudent ,isAdminister, isExpert, getRoleName, getRole } from '../../utils/auth'
import { get } from '../../utils/request'

const { Header, Content, Sider, Footer } = Layout;
const {SubMenu} =Menu;



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
    let currentMenu= isStudent()? studentMenus: (isAdminister()? administerMenus:{});
    console.log(currentMenu);
   const menus = currentMenu? currentMenu.filter(m => m.isShow):[];

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
              <span style={{color:'#fff'}}>{ `${getRole()}[${getJwtUser().username}]` }</span>
              
            </div>
          </Dropdown>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
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