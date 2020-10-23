import React from 'react';
import { getUserID } from '../../utils/auth';

class Test extends React.Component {
  userID = getUserID()
  render() {
    return <h1>ID：{this.userID ? this.userID : '未知'}</h1>
  }

}



export default Test;