import React from 'react'
import { Form, Input, Button, DatePicker, Space, message } from 'antd'
import moment from "moment"
import getDepartmentList from '../../../redux/common'
import {modifyDepartmentInfo} from '../../../services/administer/department'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 20 },
};

class DepartmentEdit extends React.Component {

  formRef = React.createRef();

  componentDidMount() {
    console.log(this.props)
    const { departmentId } = this.props
    if (departmentId) {
      getDepartmentList(true).then(res => {
        let data=JSON.parse(res);
        let getone=data.filter(item=>item.id==departmentId)
        console.log("getone",getone)
        if (getone && getone.length>0) {
            console.log(getone[0].id,getone[0].name)
          this.formRef.current.setFieldsValue({
            id:getone[0].id,
            name:getone[0].name
          })
        }
      })


    }
  }

  onFinish = value => {
    console.log(value)
    const { depar } = this.props
    let readyToPost = {
        Id:value.id,
        Name:value.name
    }
    console.log(readyToPost)
    modifyDepartmentInfo(readyToPost).then(res => {
      if (res.result) {
        message.success('修改成功！')
        this.props.hideModal();
      }
      else {
        message.error(res.message)

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
          label="编号"
          name="id"
         
          rules={[{ required: true, message: '部门编码不能为空' }]}
        >
          <Input  disabled={true} placeholder='请输入部门编码' />
        </Form.Item>

        <Form.Item
          label="部门名称"
          name="name"
          rules={[{ required: true, message: '部门名称不能为空!' }]}
        >
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button  htmlType="submit">
             修改
            </Button>
            <Button  onClick={this.props.hideModal}>
              取消
          </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }
}

export default DepartmentEdit