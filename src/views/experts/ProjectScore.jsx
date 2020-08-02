import React from 'react'
import { Card, Button, Modal } from 'antd'
import ProjectInfo from '../Project/ProjectInfo'
import Score from './Score'
import { getProjectInfoByID } from '../../services/project'

class ProjectScore extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projectID: props.location.state.id,
      project: {},
      score: props.location.state.score,
      visible: false
    }
  }

  setScore = score => {
    this.setState({ score })
    this.props.history.push({ pathname: '/expert/project', state: { id: this.state.projectID, score} })
    this.hideModal()
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }
  hideModal = () => {
    this.setState({
      visible: false
    })
  }

  componentDidMount() {
    const projectID = !!this.props.location.state && this.props.location.state.id
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
            }
          })
        }
      })
    }
  }

  render() {
    console.log(this.state)
    const { score, project, projectID, visible } = this.state
    const scoreStyle = {
      color: 'red',
      fontSize: 32
    }
    return (
      <div>
        <Card
          title={<span style={scoreStyle}>{score}</span>}
          extra={<Button
            type='primary'
            onClick={this.showModal}
          >打分</Button>}>
          <ProjectInfo project={project}></ProjectInfo>
        </Card>
        <Modal
          title="评分"
          visible={visible}
          onCancel={this.hideModal}
          footer={[]}
        >
          <Score projectID={projectID} setScore={this.setScore}></Score>
        </Modal>
      </div>

    )
  }
}

export default ProjectScore