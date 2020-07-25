import React from 'react'
import { Card, Button, Modal, Input, InputNumber } from 'antd'
import ProjectInfo from '../Project/ProjectInfo'
import Score from './Score'
const { TextArea } = Input

class ProjectScore extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      projectID: props.location.state.id,
      score: props.location.state.score,
      visible: false
    }
  }

  setScore = score => {
    this.setState({ score })
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
    //console.log(this.state.projectID)
    const { score, projectID, visible } = this.state
    return (
      <div>
        <Card
          title={`分数：${score}`}
          extra={<Button
            type='primary'
            onClick={this.showModal}
          >打分</Button>}>
          <ProjectInfo projectID={projectID}></ProjectInfo>
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