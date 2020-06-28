import React from 'react'
import { Card } from 'antd'
import CompetitionEditForm from '../../components/administer/CompetitionEditForm'
import CompetitionExpertList from '../../components/administer/CompetitionExpertList'
import CompetitionEditAppendix from '../../components/administer/CompetitionEditAppendix'

import { getCompetitionByID } from '../../services/adminCompetition'

class CompetitionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      competitionItem: null,
      experts: null,
      key: 'tab1'
    }
  }

  componentDidMount() {
    if (this.props.history.location.state && this.props.history.location.state.id) {
      let itemID = this.props.history.location.state.id
      //console.log(itemID)
      getCompetitionByID(itemID).then(res => {
        if (res.data.result) {
          let data = JSON.parse(res.data.data)
          this.setState({
            id: itemID,
            competitionItem: {
              id: data.id,
              name: data.name,
              department: data.department,
              type: data.category,
              submitStart: data.submitStart,
              submitEnd: data.submitEnd,
              appraiseStart: data.appraiseStart,
              appraiseEnd: data.appraiseEnd,
              description: data.description,
              remark: data.remark
            }
          })
        }
      })

    }
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  render() {
    const tabList = [
      {
        key: 'tab1',
        tab: '基本信息',
      },
      {
        key: 'tab2',
        tab: '评审专家',
        disabled: this.state.id === ''
      },
      {
        key: 'tab3',
        tab: '比赛说明',
        disabled: this.state.id === ''
      }
    ];

    const contentList = {
      tab1: <CompetitionEditForm item={this.state.competitionItem} history={this.props.history}></CompetitionEditForm>,
      tab2: <CompetitionExpertList></CompetitionExpertList>,
      tab3: <CompetitionEditAppendix></CompetitionEditAppendix>
    };
    return (
      <Card
        style={{ width: '100%' }}
        title={this.state.id < 0 ? '创建比赛' : this.state.name}
        tabList={tabList}
        activeTabKey={this.state.key}
        onTabChange={key => {
          this.onTabChange(key, 'key');
        }}
      >
        {contentList[this.state.key]}
      </Card>
    )
  }
}

export default CompetitionEdit