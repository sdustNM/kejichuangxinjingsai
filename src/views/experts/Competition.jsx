import React from 'react'
import { Card, Button, Descriptions, List } from 'antd'

import { appRoot } from '../../utils/request'

class Competition extends React.Component {
  constructor(props) {
    super(props)
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
          <Descriptions.Item label="比赛级别">{competition.category}选拔</Descriptions.Item>
          {competition.statusId === '1' ? <Descriptions.Item label="学院评审开始">{competition.submitStart}</Descriptions.Item> : <Descriptions.Item label="学校评审开始">{competition.submitStart}</Descriptions.Item>}
          {competition.statusId === '1' ? <Descriptions.Item label="学院评审结束">{competition.submitEnd}</Descriptions.Item> : <Descriptions.Item label="学校评审结束">{competition.submitEnd}</Descriptions.Item>}

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