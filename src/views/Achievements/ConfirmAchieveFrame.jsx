import React, { Component } from 'react'
import { Card } from 'antd';
import { TrophyOutlined, ExperimentOutlined, FileTextOutlined, FileUnknownOutlined} from '@ant-design/icons'
import ThesisList from './Thesis/ThesisList'
import PatentList from './Patent/PatentList'
import CompetitionList from './Competition/CompetitionList'
import OthersList from './Other/OthersList';
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



class ConfirmAchieveList extends Component {

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
    //console.log(this.state.showSearch)
    const { key, departmentList, showSearch, departmentNo } = this.state
    const contentList = {
      article: departmentList && <ThesisList departmentList={departmentList} showSearch={showSearch} departmentNo={departmentNo} />,
      competition: departmentList && <CompetitionList departmentList={departmentList} showSearch={showSearch} departmentNo={departmentNo} />,
      patent: departmentList && <PatentList departmentList={departmentList} showSearch={showSearch} departmentNo={departmentNo} />,
      others: departmentList && <OthersList departmentList={departmentList} showSearch={showSearch} departmentNo={departmentNo} />,
    };
    // let extra=
    // (<Button onClick={()=>exportCompetition({},'学生竞赛成果一览表.xls')}> 导出</Button>)
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

export default ConfirmAchieveList
