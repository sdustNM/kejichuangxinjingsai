import React, { Component } from 'react'
import { Button, Card } from 'antd';
import { TrophyOutlined, ExperimentOutlined, FileTextOutlined, } from '@ant-design/icons'

import ThesisList from './Thesis/ThesisList'
import PatentList from './Patent/PatentList'
import CompetitionList from './Competition/CompetitionList'

import {exportCompetition} from '../../services/Achievements'

const tabList = [
  {
    key: 'article',
    tab: <span><FileTextOutlined />论文成果</span>
  },
  {
    key: 'competition',
    tab: <span><TrophyOutlined />竞赛成果</span>
  },
  {
    key: 'patent',
    tab: <span><ExperimentOutlined />专利成果</span>
  }
]

const contentList = {
  article: <ThesisList />,
  competition: <CompetitionList />,
  patent: <PatentList />,
};

class ConfirmAchieveList extends Component {

  state = {
    key: 'article'
  }

  render() {
    let extra=
    (<Button onClick={()=>exportCompetition({},'学生竞赛成果一览表.xls')}> 导出</Button>)
    return (
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={this.state.key}
        onTabChange={key => this.setState({ key })}
        extra={extra}
      >
        {contentList[this.state.key]}
      </Card>
    )
  }
}

export default ConfirmAchieveList
