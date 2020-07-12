import React from 'react';
import { Card, Form, Input, Button, Space, Upload } from 'antd'
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import SelectManComplete from '../../../components/SelectManComplete';
import { getJwt } from '../../../utils/jwtHelper'
import { appRoot } from '../../../utils/request'

const { TextArea } = Input
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
};
const layoutWithOutLabel = {
  wrapperCol: {
    span: 12, offset: 4
  }
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class Project extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      teacher: '',
      mainList: [],
      videoList: [],
      textList: []
    }
  }
  formRef = React.createRef();
  componentDidMount() {
    //console.log(this.props)
    // const { id } = this.props
    // if (id) {
    //   getCompetitionByID(id).then(res => {
    //     if (res.data.result) {
    //       let item = JSON.parse(res.data.data)
    //       let submitStart = !item.submitStart ? null : moment(item.submitStart, 'YYYY-MM-DD')
    //       let submitEnd = !item.submitEnd ? null : moment(item.submitEnd, 'YYYY-MM-DD')
    //       let appraiseStart = !item.appraiseStart ? null : moment(item.appraiseStart, 'YYYY-MM-DD')
    //       let appraiseEnd = !item.appraiseEnd ? null : moment(item.appraiseEnd, 'YYYY-MM-DD')
    //       this.formRef.current.setFieldsValue({
    //         name: item.name,
    //         fromUnit: item.fromUnit,
    //         submitTime: [submitStart, submitEnd],
    //         appraiseTime: [appraiseStart, appraiseEnd],
    //         description: item.description
    //       })
    //     }
    //   })
    // }
  }

  onFinish = value => {
    console.log(value)
    // const { id } = this.props
    // let competitionItem = {
    //   name: value.name,
    //   department: getDeptID(),
    //   category: '校级',
    //   fromUnit: value.fromUnit,
    //   submitStart: value.submitTime[0] && value.submitTime[0].format('YYYY-MM-DD'),
    //   submitEnd: value.submitTime[1] && value.submitTime[1].format('YYYY-MM-DD'),
    //   appraiseStart: value.appraiseTime && value.appraiseTime[0] && value.appraiseTime[0].format('YYYY-MM-DD'),
    //   appraiseEnd: value.appraiseTime && value.appraiseTime[1] && value.appraiseTime[1].format('YYYY-MM-DD'),
    //   description: value.description,
    //   remark: value.remark
    // }
    // competitionItem.id = id || null
    // console.log(competitionItem)
    // setCompetition(competitionItem).then(res => {
    //   if (res.data.result) {
    //     message.success(!id ? '创建成功！' : '修改成功！')
    //     //console.log(res.data)
    //     this.props.createID(res.data.data)
    //   }
    // })
  }

  setTeacher = data => {
    this.setState({
      teacher: data
    })
    console.log(data)
  }

  handleChangeVideo = info => {
    console.log(info)
    let videoFileList = [...info.fileList];

    videoFileList = videoFileList.map(file => {
      if (file.response) {
        let data = JSON.parse(file.response.data)
        file.url = appRoot + data.url
        file.id = data.id
      }
      return file;
    });

    this.setState({ videoFileList });
  }

  handleRemoveVideo = file => {
    // deleteCompetitionFile({ id: file.id }).then(res => {
    //   if (res.data.result) {
    //     console.log(res.data.result)
    //     //console.log(fileList)
    //   }
    // })
  }


  render() {
    const state = this.props.location.state
    const { isReadOnly, teacher, videoFileList, textFileList } = this.state
    const propsVideo = {
      //action: 'http://192.168.34.201:4000/api/Appendix/UploadCompetitionFile',
      data: { id: this.props.id },
      headers: {
        authorization: getJwt(),
      },
      onChange: this.handleChange,
      onRemove: this.handleRemove,
      fileList: videoFileList
    }
    const propsText = {
      //action: 'http://192.168.34.201:4000/api/Appendix/UploadCompetitionFile',
      data: { id: this.props.id },
      headers: {
        authorization: getJwt(),
      },
      onChange: this.handleChange,
      onRemove: this.handleRemove,
      fileList: textFileList
    }
    return (
      <Card title={this.state.competitionName}>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}
        >

          <Form.Item
            label="作品名称"
            name="projectName"
            rules={[{ required: true, message: '比赛作品名称不能为空!' }]}
          >
            <Input readOnly={isReadOnly} />
          </Form.Item>
          <Form.Item
            label="指导老师"
            name="teacher"
          //rules={[{ required: true, message: '指导老师不能为空!' }]}
          >
            <SelectManComplete chooseMan={this.setTeacher} name="teacher" value={teacher}></SelectManComplete>
          </Form.Item>
          <Form.List name="names">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0 ? layout : layoutWithOutLabel)}
                      label={index === 0 ? '合作者' : ''}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "请输入合作者姓名或删除",
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="合作者姓名" style={{ width: '60%' }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item {...layoutWithOutLabel}>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{ width: '60%' }}
                    >
                      <PlusOutlined /> 添加合作者
                </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
          <Form.Item
            label="作品描述"
            name="description"
            rules={[{ required: true, message: '品描述不能为空!' }]}
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
          <Form.Item
            label="视频附件"
            name="video"
          >
            <Upload {...propsVideo}>
              <Button>
                <UploadOutlined />
                Upload
              </Button>
            </Upload>
          </Form.Item>
          
          <Card title='文档附件'>
            <Upload {...propsText}>
              <Button>
                <UploadOutlined />
                Upload
              </Button>
            </Upload>
          </Card>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                {!state.id ? '创建' : '修改'}
              </Button>
              <Button type="primary" onClick={() => this.props.history.push({ pathname: '/student/competitions', state: { id: state.competitionID } })}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Project