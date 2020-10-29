import React from 'react'
//import { Card } from 'antd'
import ProjectInfo from '../ProjectInfo'
import ReviewResult from '../ReviewResult'

class ProjectInfoAdminister extends React.Component {
  
  render() {
    const projectID = this.props.projectID
    return (
      <>
        <ProjectInfo projectID={projectID}></ProjectInfo>
        <ReviewResult projectID={projectID}></ReviewResult>
      </>
    )
  }
}

export default ProjectInfoAdminister
