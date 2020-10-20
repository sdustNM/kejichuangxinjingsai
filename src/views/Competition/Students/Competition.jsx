import React from 'react';
import { message, Card } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'

import CompetitionInfo from '../CompetitionInfo';
import CompetitionProjectState from './CompetitionProjectState';

class Competition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.location.state && this.props.location.state.id,
    }
  }

  componentDidMount() {
    if (!this.state.id) {
      message.warning("没有找到竞赛信息，请刷新后重新查看！")
      this.props.history.push('/student/competitionListXiao')
      return
    }
  }

  render() {
    const { id } = this.state
    return (
      <div>
        <Card
          title={<span><FileTextOutlined />比赛详情</span>}
          extra={<CompetitionProjectState competitionID={id} history={this.props.history}></CompetitionProjectState>}
        >
          <CompetitionInfo competitionID={id}></CompetitionInfo>
        </Card>
      </div>
    )
  }
}

export default Competition;