import React from 'react'
import MyLayout from '../../components/frame/MyLayout'
import { Route, Switch } from 'react-router-dom'
import { studentRoutes } from '../../routes'


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