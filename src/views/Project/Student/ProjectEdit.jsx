import React from 'react';
import { Card, Form, Input, Button, Space, Alert, message, Spin } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import SelectManComplete from '../../../components/SelectManComplete';
import { getProjectInfoByID, setProjectInfo } from '../../../services/project'
import { getUserID } from '../../../utils/auth';
import AppendixUpload from './AppendixUpload';
import ProjectResult from './ProjectResult_student';

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
      id: props.location.state.projectID,
      competitionID: props.location.state.competitionID,
      teacher: '',
      mainList: [],
      videoList: [],
      bzList: [],
      spinning: false,
      result: {}
    }
  }
  formRef = React.createRef();
  componentDidMount() {
    //console.log(this.props)
    if (this.state.id) {
      getProjectInfoByID({ id: this.state.id }).then(res => {
        if (res.data.result) {
          const item = JSON.parse(res.data.data)
          console.log(item)
          this.formRef.current.setFieldsValue({
            projectName: item.projectName,
            cooperators: !item.ProjectCooperator ? [] : item.ProjectCooperator.split(','),
            description: item.projectDes
          })
          this.setState({
            teacher: item.projectTeacher,
            mainList: item.AppendixMain || [],
            videoList: item.AppendixVideo || [],
            bzList: item.Appendixbz || [],
            result: {
              score_yuan: item.lastScore_yuan,
              recommend_yuan: item.recommended_yuan ? '推荐' : '未推荐',
              score_xiao: item.lastScore_xiao,
              recommend_xiao: item.recommended_xiao ? '推荐' : '未推荐'
            }
          })
        }
      })
    }

  }

  onFinish = value => {
    this.setState({
      spinning: true
    })
    //console.log(value)
    const { id, competitionID, teacher } = this.state
    const projectItem = {
      id: id,
      competitionId: competitionID,
      sno: getUserID(),
      projectName: value.projectName,
      projectDes: value.description,
      projectTeacher: teacher,
      projectCooperator: value.cooperators && value.cooperators.join(',')
    }
    //console.log(projectItem)
    setProjectInfo(projectItem).then(res => {
      this.setState({
        spinning: false
      })
      
      //console.log(res)
      if (res.data.result) {
        const projectID = JSON.parse(res.data.data)
        console.log(projectID)
        message.success(!this.state.id ? '创建成功！' : '修改成功！')
        this.setState({
          id: projectID
        })
        this.props.history.replace({ pathname: '/student/ProjectEdit', state: { projectID, competitionID } })
        
      }
    })
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
  }

  render() {
    const { teacher, id, competitionID, spinning, result } = this.state
    //console.log(this.state)
    return (
      <Card>
        <Card title='作品基本信息'>
          <Spin 
          tip="Loading..."
          size='large'
          spinning={spinning}
          delay={500}
          >
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
                <Input />
              </Form.Item>

              <Form.Item
                label="指导老师"
                name="teacher"
              >
                <SelectManComplete initValue={teacher} chooseMan={this.setTeacher}></SelectManComplete>
              </Form.Item>

              <Form.List name="cooperators">
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
                          {fields.length > 0 ? (
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

              <Form.Item {...tailLayout}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    {!id ? '创建' : '修改'}
                  </Button>
                  <Button type="primary" onClick={() => this.props.history.push({ pathname: '/student/competition', state: { id: competitionID } })}>
                    取消
              </Button>
                </Space>
              </Form.Item>
            </Form>
          </Spin>
        </Card>

        <Alert
          message={`* 作品基本信息保存后才可以上传附件(${this.state.id ? '已保存' : '未保存'})`}
          type={this.state.id ? "info" : "warning"} />

        <Card title='项目附件'>
          <AppendixUpload
            projectID={this.state.id}
            fileType='main'
            maxNum={1}
            fileList={this.state.mainList}
          ></AppendixUpload>
        </Card>
        <Card title='视频附件'>
          <AppendixUpload
            projectID={this.state.id}
            fileType='video'
            maxNum={1}
            fileList={this.state.videoList}
          ></AppendixUpload>
        </Card>
        <Card title='补充附件'>
          <AppendixUpload
            projectID={this.state.id}
            fileType='bz'
            maxNum={3}
            fileList={this.state.bzList}
          ></AppendixUpload>
        </Card>

        {id && <ProjectResult result={result}></ProjectResult>}
      </Card>
    )
  }
}

export default Project