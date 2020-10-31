import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { getJwt, getJwtUser } from './jwtHelper';

class AuthComponent extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      user: undefined
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {

    this.setState({
      user: getJwtUser()
    })
    //console.log("jwtUser:"+JSON.stringify(getJwtUser()));

  }

  render() {
    const { user } = this.state;
    if (user === undefined) {
      return (
        <div>
          Loading...
        </div>
      );
    }

    if (user === null) {
      //this.props.history.push('/login');
      return <Redirect to="/login" />
    }
    return this.props.children;

    //to do master

  }
}

export default withRouter(AuthComponent);