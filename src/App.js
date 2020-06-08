import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Student from './views/students/Student';
import PageNotFound from './views/PageNotFound'
import Login from './views/login/Login'
import Home from './views/home/Home'
import './App.css'
import AuthComponent from './utils/AuthComponent';
import getUserTest from './views/getUserTest';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact></Route>

        <Route path='/login' component={Login}></Route>
        <Route path='/error' component={PageNotFound}></Route>
       
        <AuthComponent>
          <Route path='/student' component={Student}></Route>
          <Route path="/getUserTest" component={getUserTest}></Route>
        </AuthComponent>
        <Redirect to='/error'></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
