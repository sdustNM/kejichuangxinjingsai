import React from 'react'
import { Form, Input, Button, DatePicker, Space } from 'antd'
import moment from "moment"
import { getCompetitionByID, modifyCompetition } from '../../services/adminCompetition'

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

  formRef = React.createRef();

  componentDidUpdate() {
    const { id } = this.props
    if (id) {
      getCompetitionByID(id).then(res => {
        if (res.data.result) {
          let item = JSON.parse(res.data.data)
          let submitStart = !item.submitStart ? null : moment(item.submitStart, 'YYYY-MM-DD')
          let submitEnd = !item.submitEnd ? null : moment(item.submitEnd, 'YYYY-MM-DD')
          let appraiseStart = !item.appraiseStart ? null : moment(item.appraiseStart, 'YYYY-MM-DD')
          let appraiseEnd = !item.appraiseEnd ? null : moment(item.appraiseEnd, 'YYYY-MM-DD')
          this.formRef.current.setFieldsValue({
            name: item.name,
            department: item.department,
            submitTime: [submitStart, submitEnd],
            appraiseTime: [appraiseStart, appraiseEnd],
            description: item.description
          })
        }
      })


    }
  }

  onFinish = value => {
    //console.log(value)
    const { item } = this.props
    let competitionItem = {
      id: !item ? '' : item.id,
      name: value.name,
      category: value.type,
      deparntment: value.department,
      submitStart: value.submitTime[0] && value.submitTime[0].format('YYYY-MM-DD'),
      submitEnd: value.submitTime[1] && value.submitTime[1].format('YYYY-MM-DD'),
      appraiseStart: value.appraiseTime && value.appraiseTime[0] && value.appraiseTime[0].format('YYYY-MM-DD'),
      appraiseEnd: value.appraiseTime && value.appraiseTime[1] && value.appraiseTime[1].format('YYYY-MM-DD'),
      description: value.description,
      remark: value.remark
    }
    console.log(competitionItem)
    modifyCompetition(competitionItem).then(res => {
      if (res.data.result) {
        this.props.history.push({ pathname: '/administer/competitionEdit', state: { id: res.data.data } })
      }
    })
  }

  render() {
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
          label="参赛时间"
          name="submitTime"
          rules={[{ required: true, message: '参赛时间不能为空!' }]}
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          label="评审时间"
          name="appraiseTime"
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
          <Space>
            <Button type="primary" htmlType="submit">
              {!this.props.item || !this.props.item.id ? '创建' : '修改'}
            </Button>
            <Button type="primary" onClick={() => this.props.history.goBack()}>
              取消
          </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }
}

export default CompetitionEditForm