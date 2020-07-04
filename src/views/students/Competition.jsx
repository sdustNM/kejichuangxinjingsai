import React from 'react';
import { Descriptions, message, Card } from 'antd'
import { getCompetitionByID } from '../../services/administer/competition'
import { FileTextOutlined } from '@ant-design/icons'

class Competition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      competition: {
      }
    }
  }

  componentDidMount() {
    if (!this.props.location.state || !this.props.location.state.id) {
      message.warning("没有找到竞赛信息，请刷新后重新查看！")
      this.props.history.push('/student/competitionListXiao')
      return
    }

    const id = this.props.location.state.id
    getCompetitionByID(id).then(res => {
      if (res.data.result) {
        const data = JSON.parse(res.data.data)
        console.log(data)
        this.setState({
          competition: {
            id: data.id,
            name: data.name,
            fromUnit: data.fromUnit,
            category: data.category,
            submitStart: data.submitStart,
            submitEnd: data.submitEnd,
            appraiseStart: data.appraiseStart,
            appraiseEnd: data.appraiseEnd,
            description: data.description,
            remark: data.remark,
          }
        })
      }
    })
  }

  render() {
    const { competition } = this.state
    return (
      <div>
        <Card
          title={<span><FileTextOutlined />比赛详情</span>}
          headStyle={{ backgroundColor: '#ccf0ff', fontSize: 16 }}
        >
          <Descriptions
            title={`${competition.name}(${competition.id})`}
            column={1}>
            <Descriptions.Item label="组织单位">{competition.fromUnit}</Descriptions.Item>
            <Descriptions.Item label="比赛级别">{competition.category}选拔</Descriptions.Item>
            <Descriptions.Item label="报名开始">{competition.submitStart}</Descriptions.Item>
            <Descriptions.Item label="报名结束">{competition.submitEnd}</Descriptions.Item>
            <Descriptions.Item label="比赛说明">{competition.description}</Descriptions.Item>
            <Descriptions.Item label="备注">{competition.remark}</Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    )
  }
}

export default Competition;