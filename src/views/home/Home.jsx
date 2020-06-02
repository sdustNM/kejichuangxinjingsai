import React from 'react'
import {Layout} from 'antd'
import MyHeader from '../../components/header/MyHeader'

const {Content, Footer} = Layout

export default class Home extends React.Component{
  render(){
    return (
      <Layout className="layout">
        <MyHeader></MyHeader>
        <Content style={{ padding: '0 50px' }}>
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )
  }
}