import React from 'react';
import qs from 'qs'
import {appRoot}   from   '../../utils/request';
class LoginSSO extends React.Component {

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

    window.location.href=`${appRoot}/api/loginSSO?entryId=${queryObject.entryId}`;
  }
}

export default LoginSSO;



