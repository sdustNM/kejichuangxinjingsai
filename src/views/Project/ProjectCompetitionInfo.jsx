import React from 'react'
import {Card, Descriptions, List } from 'antd'
import { getCompetitionByID } from '../../services/administer/competition'
import { appRoot } from '../../utils/request'
class ProjectCompetitionInfo extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      competition: {},
    }
  }
  componentDidMount() {
    const { competitionID } = this.props
    if (competitionID) {
      //获取竞赛基本信息
      getCompetitionByID({ id: competitionID }).then(res => {
        if (res.result) {
          const data = JSON.parse(res.data)
          console.log(data)
          this.setState({
            competition: {
              id: data.id,
              name: data.name,
              fromUnit: data.fromUnit,
              status: data.status,
              submitStart: data.submitStart,
              submitEnd: data.submitEnd,
              yuan_AppraiseStart: data.yuan_AppraiseStart,
              yuan_AppraiseEnd: data.yuan_AppraiseEnd,
              appraiseStart: data.appraiseStart,
              appraiseEnd: data.appraiseEnd,
              description: data.description,
              remark: data.remark,
              fileList: data.appendixList
            }
          })
        }
      })

    }
  }

  render() {
    const { competition } = this.state
    // console.log(competition)
    return (
      <Card>
        <Descriptions
          bordered
          size='middle'
          title='比赛信息'
          column={2}>
          <Descriptions.Item label={<strong>比赛编号</strong>}>{competition.id}</Descriptions.Item>
          <Descriptions.Item label={<strong>比赛名称</strong>}>{competition.name}</Descriptions.Item>
          <Descriptions.Item label={<strong>组织单位</strong>}>{competition.fromUnit}</Descriptions.Item>
          <Descriptions.Item label={<strong>比赛状态</strong>}>{competition.status}</Descriptions.Item>
          <Descriptions.Item label={<strong>附件</strong>}>
            <List
              size="small"
              //bordered
              dataSource={competition.fileList}
              renderItem={item => (
                <List.Item>
                  <a
                    href={appRoot + item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.name}
                  </a>
                </List.Item>)}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }
}

export default ProjectCompetitionInfo