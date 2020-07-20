import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import PageNotFound from './views/Common/PageNotFound'
import Login from './views/Login/Login'
import Home from './views/Common/Home'
import './App.css'
import AuthComponent from './utils/AuthComponent';
import getUserTest from './views/getUserTest';
import AdministerRoutes from './routes/AdministerRoutes';
import Student from './routes/StudentRoutes';
import ExpertRoutes from './routes/ExpertRoutes';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact></Route>
        <Route path='/login' component={Login} exact></Route>
        <Route path='/error' component={PageNotFound} exact></Route>
        
        <AuthComponent>
          <Route path='/administer' component={AdministerRoutes}></Route>
          <Route path='/student' component={Student}></Route>
          <Route path='/expert' component={ExpertRoutes}></Route>
          <Route path="/getUserTest" component={getUserTest}></Route>
        </AuthComponent>
        <Redirect to='/error'></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
