import React from 'react'
import { Card, Button, Modal, Space } from 'antd'
import ProjectInfo from '../Project/ProjectInfo'
import Score from './Score'

class ProjectScore extends React.Component {

  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      visible: false,
      projectID: props.location.state.projectID,
      score: props.location.state.score,
      anonymous: props.location.state.anonymous,
    }
  }

  setScore = score => {
    //const { projectID, anonymous } = this.state
    this.setState({ score })
    //this.props.history.push({ pathname: '/expert/project', state: { projectID, score, anonymous} })
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

  render() {
    //console.log(this.props)
    const { visible, projectID, score, anonymous } = this.state
    //console.log(this.props.location.state)
    const scoreStyle = {
      color: 'red',
      fontSize: 32
    }
    const extra = (
      <Space>
        <Button
          type='primary'
          onClick={this.showModal}
        >打分</Button>
        <Button
          type='primary'
          onClick={() => { this.props.history.go(-1)}}
        >返回</Button>
      </Space>
    )
    return (
      <div>
        <Card
          title={<span style={scoreStyle}>{score}</span>}
          extra={extra}>
          {projectID && <ProjectInfo projectID={projectID} anonymous={anonymous}></ProjectInfo>}
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