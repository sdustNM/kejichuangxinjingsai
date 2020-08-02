import React from 'react';
import { Descriptions, Card } from 'antd'


import AppendixList from './AppendixList';

class ProjectInfo extends React.Component {
  render() {
    const { project } = this.props
    //console.log(project)
    return (
      <Card title={`${project.name}(${project.id})`}>
        <Descriptions
          bordered
          size='middle'
          column={2}>
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