import React from 'react'
import { Descriptions, List } from 'antd'
import { getCompetitionByID } from '../../services/administer/competition'
//import { getCompetitionFilesByComId } from '../../services/administer/appendix'
import { appRoot } from '../../utils/request'
class CompetitionInfo extends React.Component {
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

      // //获取竞赛附件
      // getCompetitionFilesByComId({ comId: competitionID }).then(res => {
      //   if (res.result) {
      //     this.setState({
      //       fileList: JSON.parse(res.data)
      //     })
      //   }
      // })
    }
  }

  render() {
    const { competition } = this.state
    // console.log(competition)
    return (
      <Descriptions
        bordered
        size='middle'
        title='比赛信息'
        column={2}>
        <Descriptions.Item label={<strong>比赛编号</strong>}>{competition.id}</Descriptions.Item>
        <Descriptions.Item label={<strong>比赛名称</strong>}>{competition.name}</Descriptions.Item>
        <Descriptions.Item label={<strong>组织单位</strong>}>{competition.fromUnit}</Descriptions.Item>
        <Descriptions.Item label={<strong>比赛状态</strong>}>{competition.status}</Descriptions.Item>
        <Descriptions.Item label={<strong>报名开始</strong>}>{competition.submitStart}</Descriptions.Item>
        <Descriptions.Item label={<strong>报名结束</strong>}>{competition.submitEnd}</Descriptions.Item>
        <Descriptions.Item label={<strong>学院评审开始</strong>}>{competition.yuan_AppraiseStart}</Descriptions.Item>
        <Descriptions.Item label={<strong>学院评审结束</strong>}>{competition.yuan_AppraiseEnd}</Descriptions.Item>
        <Descriptions.Item label={<strong>学校评审开始</strong>}>{competition.appraiseStart}</Descriptions.Item>
        <Descriptions.Item label={<strong>学校评审结束</strong>}>{competition.appraiseEnd}</Descriptions.Item>
        <Descriptions.Item label={<strong>比赛描述</strong>} span={2}>{competition.description}</Descriptions.Item>
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
    )
  }
}

export default CompetitionInfo