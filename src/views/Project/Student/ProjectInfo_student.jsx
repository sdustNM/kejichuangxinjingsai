import React from 'react'
import { Card } from 'antd'
import ProjectInfo from '../ProjectInfo'
import ReviewResult from '../ReviewResult'
import ProjectCompetitionInfo from '../ProjectCompetitionInfo'
//import ProjectResult from './ProjectResult_student'
//import { getProjectInfoByID } from '../../../services/project'

class ProjectInfo_student extends React.Component {
  // constructor(...props) {
  //   super(...props)
  // }

  render() {
    const projectID = this.props.location.state && this.props.location.state.projectID
    //const competitionID = this.props.location.state && this.props.location.state.competitionID
    return (
      <Card>
        <ProjectInfo projectID={projectID}></ProjectInfo>
        <ReviewResult projectID={projectID}></ReviewResult>
      </Card>
    )
  }
}

export default ProjectInfo_student
