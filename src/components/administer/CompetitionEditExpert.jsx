import React from 'react'
import { Form, Input, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const expertList = []
for (let i = 1; i <= 5; i++) {
  expertList.push({
    userName: 'user' + i,
    password: 'pwd' + i,
    gh: i
  })
}
class CompetitionEditExpert extends React.Component {
  formRef = React.createRef();

  onFinish = (values) => {
    console.log('Received values of form:', values);
    console.log(this.formRef)
    console.log(this.formRef.current.getFieldValue('experts'))
  }
  componentDidMount() {
    this.formRef.current.setFieldsValue({
      experts: expertList
    })
  }

  render() {
    return (
      <Form
        name="dynamic_form_nest_item"
        ref={this.formRef}
        onFinish={this.onFinish}
        autoComplete="off"
      >
        <Form.List name="experts">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map(field => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                    <Form.Item
                      {...field}
                      name={[field.name, 'userName']}
                      fieldKey={[field.fieldKey, 'userName']}
                      rules={[{ required: true, message: '用户名未填写' }]}
                    >
                      <Input placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'password']}
                      fieldKey={[field.fieldKey, 'password']}
                      rules={[{ required: true, message: '密码未填写' }]}
                    >
                      <Input placeholder="密码" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'gh']}
                      fieldKey={[field.fieldKey, 'gh']}
                      rules={[{ required: true, message: '工号未填写' }]}
                    >
                      <Input placeholder="工号" />
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Space>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <PlusOutlined /> Add field
                </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default CompetitionEditExpert