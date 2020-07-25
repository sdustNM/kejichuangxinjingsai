import React from 'react'
import { Form, InputNumber, Input, Button, message } from 'antd'

import { getProjectScore, setProjectScore } from '../../services/score'

class Score extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.projectID
    }
  }
  formRef = React.createRef();

  componentDidMount() {
    if (this.state.id) {
      getProjectScore({ ProjectId: this.state.id }).then(res => {
        console.log(res)
      })
    }
  }

  onFinish = value => {
    const params = {
      ProjectId: this.state.id,
      shouldScore: value.score,
      remark: value.remark
    }
    console.log(params)
    setProjectScore(params).then(res => {
      if(res.data.result){
        this.props.setScore(value.score)
      }
      else{
        message.warning(res.data.message)
      }
    })
  }

  render() {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const tailLayout = {
      wrapperCol: { offset: 4, span: 20 },
    }
    return (
      <Form
        {...layout}
        name="score"
        onFinish={this.onFinish}
        //onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="分数"
          name="score"
          rules={[{ required: true, message: '作品分数不能为空！' }]}
        >
          <InputNumber min={0} max={100} />
        </Form.Item>

        <Form.Item
          label="评价"
          name="remark"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
        </Button>
        </Form.Item>
      </Form>
    )
  }
}
export default Score