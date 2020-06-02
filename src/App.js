import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom'

import Home from './views/home/Home'
import Student from './views/students/Student'
import Administer from './views/administers/Administer'
import Expert from './views/experts/Expert'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path = '/' component = { Home }></Route>
        <Route exact path = '/student' component = { Student }></Route>
        <Route exact path = '/administer' component = { Administer }></Route>
        <Route exact path = '/expert' component = { Expert }></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
