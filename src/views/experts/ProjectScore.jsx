import React from 'react'
import ProjectInfo from '../Project/ProjectInfo'

class ProjectScore extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      projectID:props.location.state.id
    }
  }
  render(){
    //console.log(this.state.projectID)
    return(
      <div>
        <ProjectInfo projectID={this.state.projectID}></ProjectInfo>
      </div>
    )
  }
}

export default ProjectScore