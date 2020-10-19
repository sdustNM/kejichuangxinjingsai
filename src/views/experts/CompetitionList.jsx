import React from 'react'
import { Card, Empty } from 'antd'

import { getCompetitionFullListByCurrentExpert } from '../../services/competition'
import Competition from './Competition'

class CompetitionList extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      xiao_comList: []
    }
  }
  componentDidMount() {
    getCompetitionFullListByCurrentExpert().then(res => {
      //console.log(res)
      if (res.result) {
        const comList = JSON.parse(res.data)
        console.log(comList)
        this.setState({
          xiao_comList: comList
        })
      }
    })
  }
  render() {
    return (
      <div>
        <Card title='学校比赛'>
          {!this.state.xiao_comList.length && <Empty />}
          {this.state.xiao_comList.map(competition =>
            <Competition
              key={competition.id}
              competition={competition}
              history={this.props.history}
            >
            </Competition>)}
        </Card>
      </div>
    )
  }
}

export default CompetitionList