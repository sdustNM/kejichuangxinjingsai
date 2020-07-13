import React from 'react';
import { Descriptions, message, Card, List, Button, Space } from 'antd'
import { getCompetitionByID } from '../../../services/administer/competition'
import { getCompetitionFilesByComId } from '../../../services/administer/appendix'
import { FileTextOutlined } from '@ant-design/icons'
import { appRoot } from '../../../utils/request'
import { getSimpleProjectList } from '../../../services/project';
import { getUserID } from '../../../utils/auth';

class Competition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      competition: {
      },
      fileList: [],
      projectID: 0
    }
  }

  componentDidMount() {
    if (!this.props.location.state || !this.props.location.state.id) {
      message.warning("没有找到竞赛信息，请刷新后重新查看！")
      this.props.history.push('/student/competitionListXiao')
      return
    }

    const id = this.props.location.state.id
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
    //获取用户是否参赛
    const params = {
      competitionID: id, 
      sno: getUserID()
    }
    getSimpleProjectList(params).then(res => {
      if (res.data.result) {
        const list = JSON.parse(res.data.data).list
        //console.log(list)
        if(list.length > 0){
          console.log(list[0].Id)
          this.setState({
            projectID: list[0].Id
          })
        }
        
      }
    })

  }

  render() {
    const { projectID, competition } = this.state
    const extra = (
      <Space>
        <span style={{color: 'red'}}>
          {!projectID ? <span>未参赛</span> : ''}
        </span>
        <Button
          type='primary'
          onClick={() => this.props.history.push({ pathname: '/student/Project', state: { id: projectID, competitionID: competition.id, competitionName: competition.name} })}
        >
          {projectID ? '进入比赛':'参加比赛'}
        </Button>
      </Space>
    )
    return (
      <div>
        <Card
          title={<span><FileTextOutlined />比赛详情</span>}
          extra={extra}
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
            <Descriptions.Item label="附件"></Descriptions.Item>
          </Descriptions>
          <Card>
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
          </Card>
        </Card>
      </div>
    )
  }
}

export default Competition;