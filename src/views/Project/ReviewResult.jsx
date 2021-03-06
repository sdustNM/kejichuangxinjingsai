import React from 'react';
import { Card, Descriptions } from "antd";
import { getReviewResult } from '../../services/projectRecommend'

class ReviewResult extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      yuan_score: '',
      yuan_recommend: '',
      xiao_score: '',
      xiao_recommend: ''
    }
  }

  async componentDidMount() {
    const projectID = this.props.projectID
    if (projectID) {
      const res = await getReviewResult({ id: projectID })
      if (res.result) {
        const result = JSON.parse(res.data)
        this.setState({
          yuan_score: result.yuan_lastScore,
          yuan_recommend: result.yuan_recommend,
          xiao_score: result.xiao_lastScore,
          xiao_recommend: result.xiao_recommend
        })
      }

    }
  }

  render() {
    return (
      <Card>
        <Descriptions
          bordered
          size='small'
          layout='vertical'
          column={6}
          title='作品评审结果'
        >
          <Descriptions.Item label={<strong>学院评分</strong>} >{this.state.yuan_score}</Descriptions.Item>
          <Descriptions.Item label={<strong>学院结果</strong>} >{this.state.yuan_recommend}</Descriptions.Item>
          <Descriptions.Item label={<strong>学校评分</strong>} >{this.state.xiao_score}</Descriptions.Item>
          <Descriptions.Item label={<strong>学校结果</strong>} >{this.state.xiao_recommend}</Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }
}

export default ReviewResult;