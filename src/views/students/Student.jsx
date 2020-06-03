import React from 'react'
import MyLayout from '../../components/frame/MyLayout'
import { Route, Switch } from 'react-router-dom'
import { studentRoutes } from '../../routes'

export default class Student extends React.Component {

  render() {
    const match = this.props.match

    return (
      <MyLayout>
        <Switch>
          {/* <Route path='/student' component={NoticeList} exact></Route> */}
          {/* <Route path='/student' component={NoticeList} exact></Route>
            <Route path={`${match.url}/competitionList`} component={CompetitionList}></Route>
            <Route path={`${match.url}/joinedList`} component={JoinedList}></Route> */

            studentRoutes.map(route => {
              return (
                <Route 
                  key={route.path}
                  path={match.url + route.path}
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