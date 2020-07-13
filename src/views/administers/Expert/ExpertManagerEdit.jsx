import React from 'react'
import { Form, Input, Button, Space, message } from 'antd'
import {getExpertById,modifyExpert,addExpert} from '../../../services/administer/expert'
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class ExpertManagerEdit extends React.Component {

  formRef = React.createRef();
  componentDidMount() {
    console.log(this.props)
    const { id } = this.props
    if (id) {
        getExpertById({"id":id}).then(res => {
        if (res.data.result) {
           
          let item = JSON.parse(res.data.data)
          console.log(item)
          this.formRef.current.setFieldsValue({
            expertId:item.Id,
            name: item.Name,
            unit: item.Unit,
            sfzh:item.Sfzh,
            Tel1:item.Tel1
          });

        }
      })
  

    }
  }

  onFinish = value => {
    //console.log(value)
    const { id } = this.props
    let Expert = {
      name: value.name,
      unit:value.unit,
      id:value.expertId,
      Tel1:value.Tel1,
      sfzh:value.sfzh,
    }
    if (id) {  //修改
        modifyExpert(Expert).then(res => {
            if (res.data.result) {
              message.success('修改成功！')
              this.props.hideModal()
            }
          })
    }
    else {
        addExpert(Expert).then(res => {
            if (res.data.result) {
              message.success('创建成功！')
              this.props.hideModal()
            }
          })
    }
   
    
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
          label="专家ID"
          name="expertId"
          rules={[{ required: true, message: '专家ID不能为空!' }]}
          readOnly
        >
          <Input placeholder='请输入专家ID' />
        </Form.Item>

        <Form.Item
          label="姓名"
          name="name"
          rules={[{ required: true, message: '姓名不能为空!' }]}
        >
          <Input placeholder='请输入姓名' />
        </Form.Item>

        <Form.Item
          label="单位"
          name="unit"
          rules={[{ required: true, message: '单位不能为空!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="身份证号"
          name="sfzh"
        >
          <Input />
        </Form.Item>

        
        <Form.Item
          label="电话"
          name="Tel1"
        //   rules={[{ required: false, message: '比赛描述不能为空!' }]}
        >
           <Input />
        </Form.Item>
       
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              {!this.props.id ? '创建' : '修改'}
            </Button>
            <Button type="primary" onClick={() => this.props.hideModal()}>
              取消
          </Button>
          </Space>
        </Form.Item>
      </Form>
    )
  }
}

export default ExpertManagerEdit