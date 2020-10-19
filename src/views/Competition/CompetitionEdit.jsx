import React from 'react'
import { Card, Row, Space } from 'antd'
import CompetitionEditForm from './CompetitionEditForm'
import CompetitionInfo from './CompetitionInfo'
import CompetitionExpertList from './CompetitionExpertList'
//import CompetitionEditAppendix from './CompetitionEditAppendix'
import CompetitionStatus from './CompetitionStatus'
import './CompetitionEdit.css'
import RecommendProjectYuan from '../Project/Administer/RecommendProject_Yuan'
import RecommendProjectXiao from '../Project/Administer/RecommendProject_Xiao'
import { isAdminister, isSuperAdminister } from '../../utils/auth'
import SetMaxRecommended from './SetMaxRecommended'

class CompetitionEdit extends React.Component {
  constructor(props) {
    super(props)
    //console.log(props)
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

  createID = (id, name) => {
    this.setState({ id, key: 'tab1',comName: name})
    //this.props.history.location.state.id = id
  }

  render() {
    let tabList = [
      {
        key: 'tab1',
        tab: '项目状态',
        disabled: !this.state.id
      },
      {
        key: 'tab2',
        tab: '基本信息',
      },
      // {
      //   key: 'tab3',
      //   tab: '比赛附件',
      //   disabled: !this.state.id
      // },
      {
        key: 'tab4',
        tab: '评审专家',
        disabled: !this.state.id
      },
      {
        key: 'tab5',
        tab: '推荐名额设置',
        disabled: !this.state.id
      },
      {
        key: 'tab6',
        tab: '学院推荐',
        disabled: !this.state.id 
      }, 
      {
        key: 'tab7',
        tab: '校级推荐',
        disabled: !this.state.id
      }
    ];

    if(isAdminister()) {
      tabList = tabList.filter( item => {
        return ['tab3', 'tab5', 'tab7'].indexOf(item.key) === -1
      })
    }

    const contentList = {
      tab1: <CompetitionStatus id={this.state.id}></CompetitionStatus>,
      tab2: isAdminister() ? <CompetitionInfo id={this.state.id}></CompetitionInfo> : <CompetitionEditForm id={this.state.id} createID={this.createID} history={this.props.history}></CompetitionEditForm>,
      //tab3: isSuperAdminister() && <CompetitionEditAppendix id={this.state.id}></CompetitionEditAppendix>,
      tab4: <CompetitionExpertList id={this.state.id}></CompetitionExpertList>,
      tab5: <SetMaxRecommended id={this.state.id}></SetMaxRecommended>,
      tab6: <RecommendProjectYuan id={this.state.id}></RecommendProjectYuan>,
      tab7: isSuperAdminister() && <RecommendProjectXiao id={this.state.id}></RecommendProjectXiao>
    };
    console.log()
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