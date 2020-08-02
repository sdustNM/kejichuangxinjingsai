import React from 'react'
import ProjectInfo from '../ProjectInfo'
import ProjectResultAdminister from './ProjectResult_administer'
import { Space } from 'antd'
import { getProjectInfoByID } from '../../../services/project'
import { isAdminister } from '../../../utils/auth'

class ProjectInfo_administer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: {},
      result: {},
      //spinning: true
    }
  }

  componentDidMount() {
    //console.log(this.props)
    const projectID = this.props.projectID
    if (projectID) {
      getProjectInfoByID({ id: projectID }).then(res => {
        if (res.data.result) {
          const item = JSON.parse(res.data.data)
          //console.log(item)

          this.setState({
            project: {
              id: item.id,
              name: item.projectName,
              sno: item.sno,
              teacher: item.projectTeacherName,
              cooperator: item.ProjectCooperator,
              description: item.projectDes,
              mainList: item.AppendixMain,
              videoList: item.AppendixVideo,
              bzList: item.Appendixbz
            },
            result: {
              score: isAdminister() ? item.lastScore_yuan : item.lastScore_xiao,
              scoreRate: isAdminister() ? item.ScoredRateYuan : item.ScoredRateXiao,
              recommend: (isAdminister() ? item.RecommendedYuan : item.RecommendedXiao)
            },
            //spinning: false
          })
        }
      })
    }
  }
  render() {
    const { project, result, spinning } = this.state
    //console.log(111, this.state)
    return (
      //<Spin tip='loading...' spinning={spinning}>
      <Space align="start">
        <ProjectInfo project={project} size='small'></ProjectInfo>
        <ProjectResultAdminister result={result}></ProjectResultAdminister>
      </Space>
      //</Spin>
    )
  }
}

export default ProjectInfo_administer
