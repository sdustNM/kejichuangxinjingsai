import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Form, Input, Button, Card, Space } from 'antd';

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 20,
  },
}

class AnnouncementEdit extends React.Component {

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  onFinish = values => {
    console.log('Success:', values.content.toHTML());
  };

  render() {
    return (
      <Card>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}>

          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="content"
            label="正文"
            rules={[
              {
                required: true,
              },
            ]}
          >

            <BraftEditor
              contentStyle={{height: 350, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
            //onChange={this.handleEditorChange}
            //onSave={this.submitContent}
            />

          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
          </Button>
              <Button htmlType="button" onClick={this.onReset}>
                取消
          </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default AnnouncementEdit