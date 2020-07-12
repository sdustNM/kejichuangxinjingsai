import React from 'react'
import { Card,Row,Space } from 'antd'
import CompetitionEditForm from './CompetitionEditForm'
import CompetitionExpertList from './CompetitionExpertList'
import CompetitionEditAppendix from './CompetitionEditAppendix'
import CompetitionStatus from './CompetitionStatus'
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
        tab: '项目状态',
      },
      {
        key: 'tab2',
        tab: '基本信息',
      },
      {
        key: 'tab3',
        tab: '比赛附件',
        disabled: !this.state.id
      },
      {
        key: 'tab4',
        tab: '评审专家',
        disabled: !this.state.id
      },
      {
        key: 'tab5',
        tab: '学院推荐',
        disabled: !this.state.id
      },
      {
        key: 'tab6',
        tab: '校级推荐',
        disabled: !this.state.id
      }
    ];

    const contentList = {
      tab1: <CompetitionStatus id={this.state.id}></CompetitionStatus>,
      tab2: <CompetitionEditForm id={this.state.id} createID={this.create} history={this.props.history}></CompetitionEditForm>,
      tab3: <CompetitionEditAppendix id={this.state.id}></CompetitionEditAppendix>,
      tab4: <CompetitionExpertList id={this.state.id}></CompetitionExpertList>,
      tab5: <CompetitionStatus id={this.state.id}></CompetitionStatus>,
      tab6: <CompetitionStatus id={this.state.id}></CompetitionStatus>
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