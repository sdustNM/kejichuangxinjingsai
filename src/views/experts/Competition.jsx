import React from 'react'
import { Card, Button, Descriptions, List, Divider } from 'antd'

import { appRoot } from '../../utils/request'

class Competition extends React.Component {
  constructor(...props) {
    super(...props)
    this.state = {
      competition: {
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.competition) return null
    return {
      competition: nextProps.competition
    }
  }
  render() {
    const { competition } = this.state
    console.log(competition)
    const extra = (
      <Button
        type='primary'
        onClick={() => { this.props.history.push({ pathname: '/expert/projectList', state: { id: competition.id, anonymous: competition.anonymousReview } }) }}
      >进入评分</Button>
    )
    const title = (
      <h3>
        <strong>{competition.name}</strong>
        <Divider type='vertical' />
        <span>({competition.id})</span>
      </h3>
    )
    return (
      <Card
        type="inner"
        title={title}
        extra={extra}
      >
        <Descriptions
          bordered
          size='small'
          column={2}>
          <Descriptions.Item label={<strong>组织单位</strong>}>{competition.fromUnit}</Descriptions.Item>
          <Descriptions.Item label={<strong>评比阶段</strong>}>{competition.status}</Descriptions.Item>
          <Descriptions.Item label={<strong>开始时间</strong>}>{competition.statusId === '1.3' ? competition.yuan_AppraiseStart : competition.appraiseStart}</Descriptions.Item>
          <Descriptions.Item label={<strong>结束时间</strong>}>{competition.tatusId === '1.3' ? competition.yuan_AppraiseEnd : competition.appraiseEnd}</Descriptions.Item>
          <Descriptions.Item label={<strong>匿名评审</strong>} span={2}>{competition.anonymousReview ? '是' : '否'}</Descriptions.Item>
          <Descriptions.Item label={<strong>附件</strong>}>
            {!competition.appendixList || !competition.appendixList.length ? '' : (
              <List
                size="small"
                //bordered
                dataSource={competition.appendixList}
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
            )}

          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }
}

export default Competition