import React from 'react'
import { Card,Row,Space } from 'antd'


class ExpertManagerEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        id: this.props.expertID
    }
  }

  componentDidMount() {
      this.setState({
        id: this.props.expertID
      })
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


    return (
      <div> 
      <Card
        style={{ width: '100%' }}
        title={this.state.id < 0 ? '创建比赛' : this.state.name}
        tabList={tabList}
        activeTabKey={this.state.key}
        onTabChange={key => {
          this.onTabChange(key, 'key');
        }}
      >
        
      </Card>
      </div>
    )
  }
}

export default ExpertManagerEdit