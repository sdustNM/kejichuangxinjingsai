import React from 'react'
import { Form, Input, Button, Radio, DatePicker } from 'antd'
import moment from "moment"

const { RangePicker } = DatePicker
const { TextArea } = Input

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class CompetitionEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: ''
    }
  }
  formRef = React.createRef();

  componentDidUpdate() {
    const { item } = this.props
    console.log(item)
    if (item) {
      this.formRef.current.setFieldsValue({
        name: item.name,
        department: item.department,
        type: item.type,
        submitTime: [moment(item.start, 'YYYY-MM-DD'), moment(item.end, 'YYYY-MM-DD')],
        description: item.description
      })
    }
  }

  onFinish = value => {
    console.log(value)
    console.log(this.props.item.id)
  }

  render() {
    console.log(this.props)
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={this.onFinish}
      >
        <Form.Item
          label="比赛名称"
          name="name"
          rules={[{ required: true, message: '比赛名称不能为空!' }]}
        >
          <Input placeholder='请输入比赛名称' />
        </Form.Item>

        <Form.Item
          label="组织单位"
          name="department"
          rules={[{ required: true, message: '比赛组织单位不能为空!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="比赛级别"
          name="type"
          rules={[{ required: true, message: '请选择比赛级别!' }]}
        >
          <Radio.Group >
            <Radio value='学院'>学院</Radio>
            <Radio value='学校晋级'>学校晋级</Radio>
            <Radio value='学校海选'>学校海选</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="参赛时间"
          name="submitTime"
          rules={[{ required: true, message: '参赛时间不能为空!' }]}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          label="比赛描述"
          name="description"
          rules={[{ required: true, message: '比赛描述不能为空!' }]}
        >
          <TextArea
            placeholder="请输入比赛描述"
            autoSize={{ minRows: 3, maxRows: 5 }} 
          />
        </Form.Item>
        <Form.Item
          label="备注"
          name="remark" 
        >
          <Input placeholder='备注' />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default CompetitionEditForm