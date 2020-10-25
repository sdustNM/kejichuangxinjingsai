import React from 'react';
import { Descriptions, Card } from 'antd'
import { getProjectInfoByID } from '../../services/project'

import AppendixList from './AppendixList';
//import { RichUtils } from 'draft-js';

class ProjectInfo extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      project: {},
    }
  }

  componentDidMount() {
    const projectID = this.props.projectID
    if (projectID) {
      getProjectInfoByID({ id: projectID }).then(res => {
        //console.log(res)
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
    const { project } = this.state
    const anonymous = this.props.anonymous
    //console.log(anonymous)
    return (
      <Card title={<strong>{project.competitionName}</strong>}>
        <Descriptions
          bordered
          column={2}
        >
          <Descriptions.Item label={<strong>作品名称</strong>} span={2}>{project.name}</Descriptions.Item>
          {!anonymous && <Descriptions.Item label={<strong>作者</strong>}>{project.sno}</Descriptions.Item>}
          {!anonymous && <Descriptions.Item label={<strong>指导老师</strong>}>{project.teacher}</Descriptions.Item>}
          {!anonymous && <Descriptions.Item label={<strong>合作者</strong>} span={2}>{project.cooperator}</Descriptions.Item>}
          <Descriptions.Item label={<strong>作品描述</strong>} span={2}>{project.description}</Descriptions.Item>
          <Descriptions.Item label={<strong>项目附件</strong>} span={2}>
            <AppendixList fileList={project.mainList}></AppendixList>
          </Descriptions.Item>
          <Descriptions.Item label={<strong>视频附件</strong>} span={2}>
            <AppendixList fileList={project.videoList}></AppendixList>
          </Descriptions.Item>
          <Descriptions.Item label={<strong>其他附加</strong>} span={2}>
            <AppendixList fileList={project.bzList}></AppendixList>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }
}

export default ProjectInfo