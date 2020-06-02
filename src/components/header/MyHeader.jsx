import React from 'react'
import {Layout, Menu} from 'antd'
import './header.css'

const {Header} = Layout

function MyHeader(){
  return (
    <Header>
          <div className="logo" />
          <Menu theme="light" mode="horizontal">
          </Menu>
        </Header>
  )
}

export default MyHeader