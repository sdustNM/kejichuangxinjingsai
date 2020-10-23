import { Form, Input, Button, Card, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import axios from 'axios'
import { isStudent, isExpert } from '../../utils/auth';
import qs from 'qs'
import {getJwtUser}   from   '../../utils/jwtHelper';

import React from 'react';
import { getJwt } from '../../utils/jwtHelper';
class LoginSSO_Recieve extends React.Component {
    constructor(...props) {
        super(...props);
      }
    
    
  render()
  {
    return <div></div>
  }
  componentDidMount()
  {
    const queryString = this.props.location.search ? this.props.location.search.substring(1) : ''
    const queryObject = qs.parse(queryString)
    console.log(queryObject)
    // const params = {
    //   code: queryObject.code
    // }
    console.log(queryObject.code)

    if (queryObject.code) {
      sessionStorage.setItem('myjwt', queryObject.code);
      console.log(getJwtUser());
      if (isStudent()) {
        this.props.history.push('/student')
      } else if (isExpert()) {
        this.props.history.push('/Expert')
      } else {
        this.props.history.push('/administer')
      }
    } else {
      message.error("获取Token异常");
    }
  }
}

export default LoginSSO_Recieve;

    
   