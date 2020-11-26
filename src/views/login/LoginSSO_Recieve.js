import { message } from 'antd';
import './login.css'
import { getPage } from '../../utils/auth';
import '../../utils/config'
import qs from 'qs'
//import {getJwtUser}   from   '../../utils/jwtHelper';


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
      window.localStorage.isSSO = true
      getPage(queryObject.code, this.props.history)
    } else {
      message.error("获取Token异常");
    }
  }
}

export default LoginSSO_Recieve;

    
   