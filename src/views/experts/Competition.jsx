import React from 'react'
import { Card, Button, Descriptions, List } from 'antd'

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
        onClick={() => {this.props.history.push({ pathname: '/expert/projectList', state: { id: competition.id } })}}
      >进入评分</Button>
    )
    return (
      <Card
        type="inner"
        title={`${competition.name}(${competition.id})`}
        extra={extra}
      >
        <Descriptions
          bordered
          size='small'
          column={2}>
          <Descriptions.Item label="组织单位">{competition.fromUnit}</Descriptions.Item>
          <Descriptions.Item label="评比阶段">{competition.status}</Descriptions.Item>
          <Descriptions.Item label="开始时间">{competition.statusId === '1.3' ? competition.yuan_AppraiseStart : competition.appraiseStart}</Descriptions.Item>
          <Descriptions.Item label="结束时间">{competition.tatusId === '1.3' ? competition.yuan_AppraiseEnd : competition.appraiseEnd}</Descriptions.Item>
          <Descriptions.Item label="匿名评审">{competition}</Descriptions.Item>
          <Descriptions.Item label="附件">
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