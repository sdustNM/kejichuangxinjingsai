import React from 'react'
import { Descriptions } from 'antd'

class ProjectResult extends React.Component {
  render() {
    const { result } = this.props
    console.log(result)
    return (
      <Descriptions
        bordered
        size='small'
        title='作品评审结果'
        layout='vertical'
        column={6}
      >
        <Descriptions.Item label="学院评分" >{result.score_yuan}</Descriptions.Item>
        <Descriptions.Item label="学院结果" >{result.recommend_yuan}</Descriptions.Item>
        <Descriptions.Item label="学校评分" >{result.score_xiao}</Descriptions.Item>
        <Descriptions.Item label="学校结果" >{result.recommend_xiao}</Descriptions.Item>
      </Descriptions>
    )
  }
}

export default ProjectResult
