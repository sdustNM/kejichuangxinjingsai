import React from 'react'
import MyLayout from '../../components/frame/MyLayout'
import { Route, Switch, Redirect } from 'react-router-dom'
import { studentRoutes } from '../../routes'
import { isLogin } from '../../utils/auth'

export default class Student extends React.Component {

  render() {
    return (
      
        <MyLayout>
        <Switch>
          {
            studentRoutes.map(route => {
              return (
                <Route 
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  exact
                ></Route>
              )
            })
          }
        </Switch>
      </MyLayout>

    )
  }
}