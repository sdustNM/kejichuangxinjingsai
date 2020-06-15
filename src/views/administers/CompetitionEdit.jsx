import React from 'react'
import { Card } from 'antd'
import CompetitionEditForm from '../../components/administer/CompetitionEditForm'
import CompetitionEditExpert from '../../components/administer/CompetitionEditExpert'
import CompetitionEditAppendix from '../../components/administer/CompetitionEditAppendix'



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
      this.setState({
        id: itemID,
        competitionItem: {
          id: itemID,
          name: '比赛名称',
          department: '山东科技大学',
          type: '学校海选',
          start: '2020-06-10',
          end: '2020-06-20',
          description: '比赛描述',
          remark: '备注'
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
      tab1: <CompetitionEditForm item={this.state.competitionItem}></CompetitionEditForm>,
      tab2: <CompetitionEditExpert></CompetitionEditExpert>,
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