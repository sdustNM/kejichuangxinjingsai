import React from 'react';
import { Descriptions, message, Card, List, Button, Space } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import { getSimpleProjectList } from '../../../services/project';
import { getUserID } from '../../../utils/auth';
import CompetitionInfo from '../CompetitionInfo';

class Competition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.location.state && this.props.location.state.id,
      projectID: 0
    }
  }

  componentDidMount() {
    if (!this.state.id) {
      message.warning("没有找到竞赛信息，请刷新后重新查看！")
      this.props.history.push('/student/competitionListXiao')
      return
    }

    //获取用户是否参赛
    const params = {
      competitionID: this.state.id,
      studentId: getUserID()
    }
    //console.log(params)
    getSimpleProjectList(params).then(res => {
      if (res.data.result) {
        const list = JSON.parse(res.data.data).list
        console.log(list)
        if (list.length > 0) {
          //console.log(list[0].Id)
          this.setState({
            projectID: list[0].x.Id
          })
        }

      }
    })

  }

  render() {
    console.log(this.state)
    const { projectID, id } = this.state
    const extra = (
      <Space>
        <span style={{ color: 'red' }}>
          {!projectID ? <span>未参赛</span> : ''}
        </span>
        <Button
          type='primary'
          onClick={() => this.props.history.push({ pathname: '/student/Project', state: { id: projectID, competitionID: id } })}
        >
          {projectID ? '进入比赛' : '参加比赛'}
        </Button>
      </Space>
    )

    return (
      <div>
        <Card
          title={<span><FileTextOutlined />比赛详情</span>}
          extra={extra}
        >
          <CompetitionInfo id={id}></CompetitionInfo>
        </Card>
      </div>
    )
  }
}

export default Competition;