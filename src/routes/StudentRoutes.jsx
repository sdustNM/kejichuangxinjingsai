import React from 'react'
import MyLayout from '../components/frame/MyLayout'
import { Route, Switch } from 'react-router-dom'
import { studentConfig } from './StudentConfig'


export default class Student extends React.Component {

  render() {
    return (
      
        <MyLayout>
        <Switch>
          {
            studentConfig.map(route => {
              return (
                <Route 
                  key={route.path}
                  path={route.path}
                  component={route.component}
                  exact={route.exact}
                ></Route>
              )
            })
          }
          {/* <Redirect to ="/404" /> */}
        </Switch>
      </MyLayout>

    )
  }
}