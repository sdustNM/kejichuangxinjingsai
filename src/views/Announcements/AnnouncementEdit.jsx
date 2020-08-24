import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Form, Input, Button, Card, Space, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons'

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
    const props = {
      name: "avatar",
      listType: "picture-card",
      className: "avatar-uploader",
      // showUploadList: false,
      // beforeUpload: this.beforeUpload,
      // onChange={ this.handleChange }
      // onRemove: file => {
      //   this.setState(state => {
      //     const index = state.fileList.indexOf(file);
      //     const newFileList = state.fileList.slice();
      //     newFileList.splice(index, 1);
      //     return {
      //       fileList: newFileList,
      //     };
      //   });
      // },
      // beforeUpload: file => {
      //   this.setState(state => ({
      //     fileList: [...state.fileList, file],
      //   }));
      //   return false;
      // },
      // fileList,
    }
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
            name="picture"
            label="封面图片"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload {...props}>
              <Button>
                <UploadOutlined /> Select File
          </Button>
            </Upload>
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
              contentStyle={{ height: 350, boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)' }}
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