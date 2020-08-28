import React from 'react'
import { Form, Input, Button, DatePicker, Space, message } from 'antd'
import moment from "moment"
import { getCompetitionByID, setCompetition } from '../../services/administer/competition'
import { getDeptID } from '../../utils/auth'
import CompetitionEditAppendix from './CompetitionEditAppendix'

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
  appedixRef = React.createRef()
  state = {
    appendixList: null
  }
  componentDidMount() {
    //console.log(this.props)
    const { id } = this.props
    if (id) {
      getCompetitionByID(id).then(res => {
        if (res.data.result) {
          let item = JSON.parse(res.data.data)
          console.log(item)
          let submitStart = !item.submitStart ? null : moment(item.submitStart, 'YYYY-MM-DD HH:mm')
          let submitEnd = !item.submitEnd ? null : moment(item.submitEnd, 'YYYY-MM-DD HH:mm')
          let yuan_appraiseStart = !item.yuan_AppraiseStart ? null : moment(item.yuan_AppraiseStart, 'YYYY-MM-DD HH:mm')
          let yuan_appraiseEnd = !item.yuan_AppraiseEnd ? null : moment(item.yuan_AppraiseEnd, 'YYYY-MM-DD HH:mm')
          let appraiseStart = !item.appraiseStart ? null : moment(item.appraiseStart, 'YYYY-MM-DD HH:mm')
          let appraiseEnd = !item.appraiseEnd ? null : moment(item.appraiseEnd, 'YYYY-MM-DD HH:mm')
          this.formRef.current.setFieldsValue({
            name: item.name,
            fromUnit: item.fromUnit,
            submitTime: [submitStart, submitEnd],
            yuan_appraiseTime: [yuan_appraiseStart, yuan_appraiseEnd],
            appraiseTime: [appraiseStart, appraiseEnd],
            description: item.description
          })
          this.setState({
            appendixList: item.appendixList
          })
        }
      })


    }
  }

  getAppendixUrl = () => {
    return this.appedixRef.current.getAppendixUrls()

  }

  onFinish = value => {
    console.log(this.getAppendixUrl())
    const { id } = this.props
    let competitionItem = {
      name: value.name,
      department: getDeptID(),
      category: '校级',
      fromUnit: value.fromUnit,
      submitStart: value.submitTime[0] && value.submitTime[0].format('YYYY-MM-DD HH:mm'),
      submitEnd: value.submitTime[1] && value.submitTime[1].format('YYYY-MM-DD HH:mm'),
      yuan_AppraiseStart: value.yuan_appraiseTime && value.yuan_appraiseTime[0] && value.yuan_appraiseTime[0].format('YYYY-MM-DD HH:mm'),
      yuan_AppraiseEnd: value.yuan_appraiseTime && value.yuan_appraiseTime[1] && value.yuan_appraiseTime[1].format('YYYY-MM-DD HH:mm'),
      appraiseStart: value.appraiseTime && value.appraiseTime[0] && value.appraiseTime[0].format('YYYY-MM-DD HH:mm'),
      appraiseEnd: value.appraiseTime && value.appraiseTime[1] && value.appraiseTime[1].format('YYYY-MM-DD HH:mm'),
      description: value.description,
      remark: value.remark,
      appendixUrl: this.getAppendixUrl()
    }
    competitionItem.id = id || null
    //console.log(competitionItem)
    setCompetition(competitionItem).then(res => {
      if (res.data.result) {
        message.success(!id ? '创建成功！' : '修改成功！')
        console.log(res.data)
        this.props.createID(res.data.data)
      }
    })
  }

  render() {
    return (
      <div>
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
            name="fromUnit"
            rules={[{ required: true, message: '比赛组织单位不能为空!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="参赛时间"
            name="submitTime"
            rules={[{ required: true, message: '参赛时间不能为空!' }]}
            initialValue={[moment().startOf('day'), moment().startOf('day')]}
          >
            <RangePicker
              showTime={{
                format: 'HH:mm',
                defaultValue: [moment('00:00', 'mm:ss'), moment('00:00', 'mm:ss')]
              }}
              format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item
            label="学院评审时间"
            name="yuan_appraiseTime"
            rules={[{ required: true, message: '学院评审时间不能为空!' }]}
            initialValue={[moment().startOf('day'), moment().startOf('day')]}
          >
            <RangePicker
              showTime={{
                format: 'HH:mm',
                defaultValue: [moment('00:00', 'mm:ss'), moment('00:00', 'mm:ss')]
              }}
              format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item
            label="学校评审时间"
            name="appraiseTime"
            rules={[{ required: true, message: '学校评审时间不能为空!' }]}
            initialValue={[moment().startOf('day'), moment().startOf('day')]}
          >
            <RangePicker
              showTime={{
                format: 'HH:mm',
                defaultValue: [moment('00:00', 'mm:ss'), moment('00:00', 'mm:ss')]
              }}
              format="YYYY-MM-DD HH:mm" />
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
          {
            this.state.appendixList !== null && (
              <Form.Item
                label="附件"
                name="appendix"
              >
                <CompetitionEditAppendix appendixList={this.state.appendixList} ref={this.appedixRef} />
              </Form.Item>
            )
          }
          <Form.Item
            label="备注"
            name="remark"
          >
            <Input placeholder='备注' />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                {!this.props.id ? '创建' : '修改'}
              </Button>
              <Button type="primary" onClick={() => this.props.history.push('/administer/competitions/xiao')}>
                取消
          </Button>
            </Space>
          </Form.Item>
        </Form>
        {/* <Alert
          message={`* 作品基本信息保存后才可以上传附件(${this.state.id ? '已保存' : '未保存'})`}
          type={this.state.id ? "info" : "warning"} /> */}

      </div>
    )
  }
}

export default CompetitionEditForm