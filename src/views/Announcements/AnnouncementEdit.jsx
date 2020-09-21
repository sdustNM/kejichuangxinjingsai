import React from 'react'
import { Form, Input, Button, Card, Space, Modal, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons'
import PicturesWall from "./pictures-wall";
import RichTextEditor from './rich-text-editor'
import Preview from './Preview';
import { setNewsInfo } from '../../services/news'

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 10,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 10,
  },
}

class AnnouncementEdit extends React.Component {

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.pwRef = React.createRef()
    this.contentRef = React.createRef()
    this.state = {
      title: '',
      picUrl: '',
      content: '',
      previewVisible: false,
    }
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = () => {
    const title = this.formRef.current.getFieldValue('title')
    const content = this.contentRef.current.getContent()
    if (!title || !content) {
      message.warning('无预览内容！')
    } else {
      this.setState({
        title,
        content,
        previewVisible: true
      })

    }


  };
  onFinish = async ({ title }) => {

    const picUrl = this.pwRef.current.getPicture()
    const content = this.contentRef.current.getContent()


    const params = {
      title,
      titleImgUrl: picUrl,
      content,
    }
    console.log(params)
    const res = await setNewsInfo(params)
    if(res.result){
      const msg = this.props.location.state.id ? '修改成功' : '发布成功'
      message.success(msg)
      this.props.history.replace({ pathname: '/administer/AnnouncementEdit', state: { id: res.data } })
    }
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
    const title = (
      <span>
        <Button
          type='link'
          onClick={() => { this.props.history.go(-1) }}>
          <ArrowLeftOutlined style={{ fontSize: 20 }} />
        </Button>
        <span style={{ fontSize: 20 }}>编辑通知</span>
      </span>
    )
    const extra = (
      <Button type='default' onClick={this.handlePreview}>预览</Button>
    )
    return (
      <Card title={title} extra={extra}>
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
            label="封面"
          // rules={[
          //   {
          //     required: true,
          //   },
          // ]}
          >
            <PicturesWall
              ref={this.pwRef}
              picture={this.picUrl}
            />
          </Form.Item>
          <Form.Item
            name="content"
            label="正文"
            wrapperCol={{ span: 20 }}
          >
            <RichTextEditor
              content={this.state.content}
              ref={this.contentRef}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
          </Button>
              <Button type="danger" htmlType="button" onClick={this.onReset}>
                取消
          </Button>
            </Space>
          </Form.Item>
        </Form>
        <Modal
          visible={this.state.previewVisible}
          title={this.state.title}
          width={800}
          footer={null}
          onCancel={this.handleCancel}
        >
          <Preview
            title={this.state.title}
            //picUrl={this.state.picUrl}
            content={this.state.content} />
        </Modal>
      </Card>
    )
  }
}

export default AnnouncementEdit