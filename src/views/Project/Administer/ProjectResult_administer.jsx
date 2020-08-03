import React from 'react'
import { Descriptions, Card } from 'antd'

class ProjectResult_administer extends React.Component {
  render() {
    const { result } = this.props
    console.log(result)
    return (
      <Card title='作品评审结果'>
        <Descriptions
          bordered
          size='small'
          layout='vertical'
          column={1}
        >
          <Descriptions.Item label="评审分数" >{result.score}</Descriptions.Item>
          <Descriptions.Item label="评审人数" >{result.scoreRate}</Descriptions.Item>
          <Descriptions.Item label="是否推荐" >
            {result.recommend ? '推荐' : '未推荐'}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }
}

export default ProjectResult_administer
