import React from 'react'
import MyLayout from '../components/frame/MyLayout'
import { Route, Switch } from 'react-router-dom'
import { expertConfig } from './ExpertConfig'
import { isExpert } from '../utils/auth'
import NoPermission from '../views/Common/NoPermission'

export default class ExpertRoutes extends React.Component {

  render() {
    return (
      isExpert() ? (<MyLayout>
        <Switch>
          {
            expertConfig.map(route => {
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
      </MyLayout>) : <NoPermission></NoPermission>
        

    )
  }
}