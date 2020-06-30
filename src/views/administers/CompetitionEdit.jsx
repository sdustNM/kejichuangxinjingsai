import React from 'react'
import { Card } from 'antd'
import CompetitionEditForm from '../../components/administer/CompetitionEditForm'
import CompetitionExpertList from '../../components/administer/CompetitionExpertList'
import CompetitionEditAppendix from '../../components/administer/CompetitionEditAppendix'

class CompetitionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      competitionItem: null,
      experts: null,
      key: 'tab1'
    }
  }

  componentDidMount() {
    if (this.props.history.location.state && this.props.history.location.state.id) {
      this.setState({
        id: this.props.history.location.state.id
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
      tab1: <CompetitionEditForm id={this.state.id} history={this.props.history}></CompetitionEditForm>,
      tab2: <CompetitionExpertList id={this.state.id}></CompetitionExpertList>,
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