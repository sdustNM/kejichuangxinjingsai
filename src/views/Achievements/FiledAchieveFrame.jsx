import React, { Component } from 'react'
import { Card } from 'antd';
import { TrophyOutlined, ExperimentOutlined, FileTextOutlined, FileUnknownOutlined } from '@ant-design/icons'
import FiledThesisList from './Thesis/FiledThesisList'
import FiledPatentList from './Patent/FiledPatentList'
import FiledCompetitionList from './Competition/FiledCompetitionList'
import FiledOthersList from './Other/FiledOthersList'
import getDepartmentList from '../../redux/common'
import { getDeptID, isStudent } from '../../utils/auth';

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
  },
  {
    key: 'others',
    tab: <span><FileUnknownOutlined />其他成果</span>
  }
]



class FiledAchieveList extends Component {

  state = {
    departmentNo: getDeptID(),
    showSearch: !isStudent(),
    key: 'article',
    departmentList: null,
  }

  async componentDidMount() {
    const res = await getDepartmentList()
    if (res) {
      let departmentList = JSON.parse(res)
      if (this.state.departmentNo != 0) {
        departmentList = departmentList.filter(item => item.id == this.state.departmentNo)
      }
      if (departmentList.length !== 0) {
        this.setState({ departmentList })
      }
    }
  }

  render() {
    const { key, departmentList, showSearch, departmentNo } = this.state
    const contentList = {
      article: departmentList && <FiledThesisList departmentList={departmentList} showSearch={showSearch} departmentNo={departmentNo} />,
      competition: departmentList && <FiledCompetitionList departmentList={departmentList} showSearch={showSearch} departmentNo={departmentNo} />,
      patent: departmentList && <FiledPatentList departmentList={departmentList} showSearch={showSearch} departmentNo={departmentNo} />,
      others: departmentList && <FiledOthersList departmentList={departmentList} showSearch={showSearch} departmentNo={departmentNo} />,
    };

    return (
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={key}
        onTabChange={key => this.setState({ key })}
      //extra={extra}
      >
        {contentList[this.state.key]}
      </Card>
    )
  }
}

export default FiledAchieveList
