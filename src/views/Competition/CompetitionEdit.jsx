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
      id: props.history.location.state && props.history.location.state.id,
      isEnd: false,
      key: 'tab1',
      comName: props.history.location.state && props.history.location.state.comName,

    }
  }

  componentDidMount() {
    const statusID = this.props.history.location.state && this.props.history.location.state.statusID
    if (this.props.history.location.state && this.props.history.location.state.id) {
      this.setState({
        id: this.props.history.location.state.id,
        key: 'tab1',
        isEnd: statusID >= 3
      })
    }
    else {
      this.setState({
        key: 'tab2',
        isEnd: statusID >= 3
      })
    }
  }

  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  };

  createID = (id, name) => {
    this.setState({ id, key: 'tab1', comName: name })
    //this.props.history.location.state.id = id
  }

  setEnd = () => {
    this.setState({ isEnd: true })
  }

  render() {
    const { id, isEnd, key, comName} = this.state
    let tabList = [
      {
        key: 'tab1',
        tab: '项目状态',
        disabled: !id
      },
      {
        key: 'tab2',
        tab: '基本信息',
      },
      {
        key: 'tab4',
        tab: '评审专家',
        disabled: !id
      },
      {
        key: 'tab5',
        tab: '推荐名额设置',
        disabled: !id
      },
      {
        key: 'tab6',
        tab: '学院推荐',
        disabled: !id
      },
      {
        key: 'tab7',
        tab: '学校评审',
        disabled: !id
      }
    ];

    if (isAdminister()) {
      tabList = tabList.filter(item => {
        return ['tab5', 'tab7'].indexOf(item.key) === -1
      })
    }

    const contentList = {
      tab1: <CompetitionStatus id={id} setEnd={this.setEnd}></CompetitionStatus>,
      tab2: isAdminister() || isEnd ? <CompetitionInfo competitionID={id}></CompetitionInfo> : <CompetitionEditForm id={id} createID={this.createID} history={this.props.history}></CompetitionEditForm>,
      //tab3: isSuperAdminister() && <CompetitionEditAppendix id={this.state.id}></CompetitionEditAppendix>,
      tab4: <CompetitionExpertList id={id} isEnd={isEnd}></CompetitionExpertList>,
      tab5: <SetMaxRecommended id={id} isEnd={isEnd}></SetMaxRecommended>,
      tab6: <RecommendProjectYuan id={id} isEnd={isEnd}></RecommendProjectYuan>,
      tab7: isSuperAdminister() && <RecommendProjectXiao id={id} isEnd={isEnd}></RecommendProjectXiao>
    };

    return (

      <div> <Row justify="center" className="CompetitionTitle" align="middle">
        <Space><h3 className="titleItem">比赛编号：{id} </h3>
          <h3 className="titleItem">比赛名称：{comName}</h3>
        </Space>
      </Row>
        <Card
          style={{ width: '100%' }}
          title={id < 0 ? '创建比赛' : comName}
          tabList={tabList}
          activeTabKey={key}
          onTabChange={k => {
            this.onTabChange(k, 'key');
          }}
        >
          {contentList[key]}
        </Card>
      </div>
    )
  }
}

export default CompetitionEdit