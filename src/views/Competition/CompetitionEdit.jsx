import React from 'react'
import { Card, Row, Space } from 'antd'
import CompetitionEditForm from './CompetitionEditForm'
import CompetitionInfo from './CompetitionInfo'
import CompetitionExpertList from './CompetitionExpertList'
import CompetitionEditAppendix from './CompetitionEditAppendix'
import CompetitionStatus from './CompetitionStatus'
import './CompetitionEdit.css'
import RecommendProject_Yuan from '../Project/RecommendProject_Yuan'
import RecommendProject_Xiao from '../Project/RecommendProject_Xiao'
import { isAdminister, isSuperAdminister } from '../../utils/auth'

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
        id: this.props.history.location.state.id,
        key: 'tab1'
      })
    }
    else {
      this.setState({
        key: 'tab2'
      })
    }
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  create = id => {
    this.setState({ id })
    //this.props.history.location.state.id = id
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
        disabled: !this.state.id || isAdminister()
      },
      {
        key: 'tab4',
        tab: '评审专家',
        disabled: !this.state.id
      },
      {
        key: 'tab5',
        tab: '学院推荐',
        disabled: !this.state.id || isSuperAdminister()
      },
      {
        key: 'tab6',
        tab: '校级推荐',
        disabled: !this.state.id || isAdminister()
      }
    ];


    const contentList = {
      tab1: <CompetitionStatus id={this.state.id}></CompetitionStatus>,
      tab2: isAdminister() ? <CompetitionInfo id={this.state.id}></CompetitionInfo> : <CompetitionEditForm id={this.state.id} createID={this.create} history={this.props.history}></CompetitionEditForm>,
      tab3: isSuperAdminister() && <CompetitionEditAppendix id={this.state.id}></CompetitionEditAppendix>,
      tab4: <CompetitionExpertList id={this.state.id}></CompetitionExpertList>,
      tab5: <RecommendProject_Yuan id={this.state.id}></RecommendProject_Yuan>,
      tab6: isSuperAdminister() && <RecommendProject_Xiao id={this.state.id}></RecommendProject_Xiao>
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