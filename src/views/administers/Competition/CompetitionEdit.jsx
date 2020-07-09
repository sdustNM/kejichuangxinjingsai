import React from 'react'
import { Card,Row,Space } from 'antd'
import CompetitionEditForm from './CompetitionEditForm'
import CompetitionExpertList from './CompetitionExpertList'
import CompetitionEditAppendix from './CompetitionEditAppendix'
import './CompetitionEdit.css'

class CompetitionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.history.location.state && this.props.history.location.state.id,
      key: 'tab1',
      comName: props.history.location.state && this.props.history.location.state.comName,
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

  create = id => {
    this.setState({id})
  }

  render() {
    const tabList = [
      {
        key: 'tab1',
        tab: '基本信息',
      },
      {
        key: 'tab2',
        tab: '比赛说明',
        disabled: !this.state.id
      },
      {
        key: 'tab3',
        tab: '评审专家',
        disabled: !this.state.id
      }
    ];

    const contentList = {
      tab1: <CompetitionEditForm id={this.state.id} createID={this.create} history={this.props.history}></CompetitionEditForm>,
      tab2: <CompetitionEditAppendix id={this.state.id}></CompetitionEditAppendix>,
      tab3: <CompetitionExpertList id={this.state.id}></CompetitionExpertList>
    };
    return (

      <div> <Row justify="center" className="CompetitionTitle" align="middle"> 
        <Space><h3 className="titleItem">比赛编号：{this.state.id} </h3>
        <h3 className="titleItem">比赛名称：{this.state.comName}</h3>
        </Space>
        </Row>
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
      </div>
    )
  }
}

export default CompetitionEdit