import React from 'react'
import { Card } from 'antd'

import { getCompetitionFullListByCurrentExpert } from '../../services/competition'
import Competition from './Competition'

class CompetitionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      xiao_comList: [],
      yuan_comList: []
    }
  }
  componentDidMount() {
    getCompetitionFullListByCurrentExpert().then(res => {
      //console.log(res)
      if (res.data.result) {
        const comList = JSON.parse(res.data.data)
        console.log(comList)
        this.setState({
          xiao_comList: comList.filter(item => item.category === '校级'),
          yuan_comList: comList.filter(item => item.category === '院级')
        })
      }
    })
  }
  render() {
    return (
      <div>
        <Card title='学校比赛'>
          {this.state.xiao_comList.map(competition =>
            <Competition
              key={competition.id}
              competition={competition}
              history={this.props.history}
            >
            </Competition>)}
        </Card>
        <Card title='学院比赛'>

        </Card>
      </div>
    )
  }
}

export default CompetitionList