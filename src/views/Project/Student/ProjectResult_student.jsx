import React from 'react'
import { Descriptions, Card } from 'antd'

class ProjectResult extends React.Component {
  render() {
    const { result } = this.props
    //console.log(result)
    return (
      <Card title='作品评审结果'> 
        <Descriptions
          bordered
          size='small'
          layout='vertical'
          column={6}
        >
          <Descriptions.Item label="学院评分" >{result.score_yuan}</Descriptions.Item>
          <Descriptions.Item label="学院结果" >{result.recommend_yuan}</Descriptions.Item>
          <Descriptions.Item label="学校评分" >{result.score_xiao}</Descriptions.Item>
          <Descriptions.Item label="学校结果" >{result.recommend_xiao}</Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }
}

export default ProjectResult
