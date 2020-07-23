import React from 'react';
import { Button, Descriptions, List } from 'antd'

class ProjectExpertSetScore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: {}
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.projectID) return null
    getProjectInfoByID({ id: nextProps.projectID }).then(res => {
      if (res.data.result) {
        const item = JSON.parse(res.data.data)
        console.log(item)
        return {
          project: {
            id: item.id,
            name: item.name,
            sno: item.sno,
            teacher: item.projectTeacherName,
            cooperator: item.ProjectCooperator,
            description: item.projectDes,
            mainList: item.AppendixMain,
            videoList: item.AppendixVideo,
            bzList: item.Appendixbz
          }
        }
      }
    })
  }

  render() {
    const { project } = this.state
    //console.log(teacher)
    return (
      <Descriptions
        bordered
        size='middle'
        title={`${project.name}(${project.id})`}
        column={2}>
        <Descriptions.Item label="作者">{project.sno}选拔</Descriptions.Item>
        <Descriptions.Item label="指导老师">{project.teacher}</Descriptions.Item>
        <Descriptions.Item label="合作者" span={2}>{project.cooperator}</Descriptions.Item>
        <Descriptions.Item label="作品描述" span={2}>{project.description}</Descriptions.Item>
        <Descriptions.Item label="项目附件">{project.submitEnd}</Descriptions.Item>
        <Descriptions.Item label="视频附件描述" span={2}>
          <List
            size="small"
            //bordered
            dataSource={project.videoList}
            renderItem={item => (
              <List.Item>
                <a
                  href={appRoot + item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              </List.Item>)}
          />
        </Descriptions.Item>
        <Descriptions.Item label="其他附加">
          <List
            size="small"
            //bordered
            dataSource={project.bzList}
            renderItem={item => (
              <List.Item>
                <a
                  href={appRoot + item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              </List.Item>)}
          />
        </Descriptions.Item>
      </Descriptions>
    )
  }
}

export default ProjectExpertSetScore