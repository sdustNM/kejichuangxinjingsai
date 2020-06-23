import React from 'react'
import { Modal } from 'antd'

class CompetitionEditExpert extends React.Component {

  handleOk = e => {
    console.log(e)
    this.props.hideModal()
  };

  handleCancel = e => {
    console.log(e)
    this.props.hideModal()
  };

  render() {
    return (
      <Modal
        title="Basic Modal"
        visible={this.props.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    )
  }

}

export default CompetitionEditExpert