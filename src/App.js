import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Student from './views/students/Student';
import PageNotFound from './views/PageNotFound'
import Login from './views/login/Login'
import Home from './views/home/Home'
import './App.css'


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact></Route>
        <Route path='/student' component={Student}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/error' component={PageNotFound}></Route>
        <Redirect to='/error'></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
