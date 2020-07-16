import React from 'react'
import { Descriptions } from 'antd'
import { getCompetitionByID } from '../../../services/administer/competition'
import { getDeptID } from '../../../utils/auth'

const { TextArea } = Input

class CompetitionInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      competition: null,
      fileList: []
    }
    
  }
  componentDidMount() {
    const { id } = this.props
    if (id) {
      //获取竞赛基本信息
    getCompetitionByID(id).then(res => {
      if (res.data.result) {
        const data = JSON.parse(res.data.data)
        //console.log(data)
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

    //获取竞赛附件
    getCompetitionFilesByComId({ comId: id }).then(res => {
      if (res.data.result) {
        this.setState({
          fileList: JSON.parse(res.data.data)
        })
      }
    })


    }
  }

  render() {
    return (
      <Descriptions
            bordered
            size='middle'
            title={`${competition.name}(${competition.id})`}
            column={2}>
            <Descriptions.Item label="组织单位">{competition.fromUnit}</Descriptions.Item>
            <Descriptions.Item label="比赛级别">{competition.category}选拔</Descriptions.Item>
            <Descriptions.Item label="报名开始">{competition.submitStart}</Descriptions.Item>
            <Descriptions.Item label="报名结束">{competition.submitEnd}</Descriptions.Item>
            <Descriptions.Item label="学院评审开始">{competition.submitStart}</Descriptions.Item>
            <Descriptions.Item label="学院评审结束">{competition.submitEnd}</Descriptions.Item>
            <Descriptions.Item label="学校评审开始">{competition.submitStart}</Descriptions.Item>
            <Descriptions.Item label="学校评审结束">{competition.submitEnd}</Descriptions.Item>
            <Descriptions.Item label="比赛描述" span={2}>{competition.description}</Descriptions.Item>
            <Descriptions.Item label="附件">
            <List
              size="small"
              //bordered
              dataSource={this.state.fileList}
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