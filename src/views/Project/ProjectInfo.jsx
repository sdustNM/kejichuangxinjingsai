import React from 'react';
import { Descriptions, Card } from 'antd'
import { getProjectInfoByID } from '../../services/project'

import AppendixList from './AppendixList';
import { RichUtils } from 'draft-js';

class ProjectInfo extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      project: {}
    }
  }

  componentDidMount() {
    const projectID = this.props.projectID
    if (projectID) {
      getProjectInfoByID({ id: projectID }).then(res => {
        console.log(res)
        if (res.result) {
          const item = JSON.parse(res.data)
          //console.log(item)
          this.setState({
            project: {
              id: item.id,
              competitionName: item.competitionName,
              name: item.projectName,
              sno: item.sno,
              teacher: item.projectTeacherName,
              cooperator: item.ProjectCooperator,
              description: item.projectDes,
              mainList: item.AppendixMain,
              videoList: item.AppendixVideo,
              bzList: item.Appendixbz
            }
          })
        }
      })
    }
  }

  render() {
    const { project, size } = this.state
    //console.log(project)
    return (
      <Card title={project.competitionName}>
        <Descriptions
          bordered
          size={size || 'middle'}
          column={2}
        >
          <Descriptions.Item label="作品名称" span={2}>{project.name}</Descriptions.Item>
          <Descriptions.Item label="作者">{project.sno}</Descriptions.Item>
          <Descriptions.Item label="指导老师">{project.teacher}</Descriptions.Item>
          <Descriptions.Item label="合作者" span={2}>{project.cooperator}</Descriptions.Item>
          <Descriptions.Item label="作品描述" span={2}>{project.description}</Descriptions.Item>
          <Descriptions.Item label="项目附件" span={2}>
            <AppendixList fileList={project.mainList}></AppendixList>
          </Descriptions.Item>
          <Descriptions.Item label="视频附件" span={2}>
            <AppendixList fileList={project.videoList}></AppendixList>
          </Descriptions.Item>
          <Descriptions.Item label="其他附加" span={2}>
            <AppendixList fileList={project.bzList}></AppendixList>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }
}

export default ProjectInfo