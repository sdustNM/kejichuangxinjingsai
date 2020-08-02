import React from 'react'
import ProjectInfo from '../ProjectInfo'
import ProjectResult from '../ProjectResult'
import { Card } from 'antd'
import { getProjectInfoByID } from '../../../services/project'

class ProjectInfo_student extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: {},
      result: {}
    }
  }

  componentDidMount() {
    //console.log(this.props.location)
    const projectID = this.props.location.state && this.props.location.state.projectID
    //console.log(projectID)
    if (projectID) {
      getProjectInfoByID({ id: projectID }).then(res => {
        if (res.data.result) {
          const item = JSON.parse(res.data.data)
          console.log(item)
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
              score_yuan: item.lastScore_yuan,
              recommend_yuan: item.recommended_yuan ? '推荐' : '未推荐',
              score_xiao: item.lastScore_xiao,
              recommend_xiao: item.recommended_xiao ? '推荐' : '未推荐'
            }
          })
        }
      })
    }
  }
  render() {
    const { project, result } = this.state
    console.log(result)
    return (
      <Card>
        <ProjectInfo project={project}></ProjectInfo>
        <ProjectResult result={result}></ProjectResult>
      </Card>
    )
  }
}

export default ProjectInfo_student
