import React from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import { getJwt, getJwtUser } from './jwtHelper';

class AuthTest extends React.Component {

  getUser = () => {
    const jwt = getJwt();
    if (!jwt) {
      return null;
    }
    return getJwtUser();
  }


  render() {
    const user = this.getUser();
    if (user === null) {
      const from_url = encodeURI(this.props.location.pathname)
      const client_id = 'GIjp4ZLhLMqhg50um2'
      const redirect_uri = encodeURI(`http://192.168.34.25:3000/logintest`)
      const url = `http://my.sdust.edu.cn/cas/oauth2.0/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`
      window.location.href = url
    }

    return <></>

  }
}

export default withRouter(AuthTest);