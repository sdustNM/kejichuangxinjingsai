import React from 'react';
import { Space } from 'antd'
import logo from '../../assets/images/logo.png'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Space size={50}>
        <img src={logo} alt='logo' height='48px'></img>
        <span style={{
          color: 'white',
          fontSize: '32px'
        }}>大学生科技创新竞赛</span>
      </Space>
    )
  }
}

export default Header;