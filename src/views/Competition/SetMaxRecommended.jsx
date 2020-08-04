import React from 'react'
import { Descriptions, InputNumber, Button } from 'antd'

class SetMaxRecommended extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    let list = []
    for (let i = 1; i < 30; i++) {
      list.push({
        deptID: 2100 + i + '',
        deptName: '山东科技大学第' + (2100 + i) + '学院',
        maxNum: 30 - i
      })
    }
    this.setState({ list })
  }

  changeValue = (index, value) => {
    console.log(index, value)
    let list = this.state.list
    list[index].maxNum = value
    this.setState({
      list
    })
  }

  saveValues = () => {
    console.log(this.state.list)
    console.log(JSON.stringify(this.state.list))
  }

  render() {
    const { list } = this.state
    console.log(list)
    return (
      <Descriptions
        title="各部门推荐人数限制"
        bordered
        size='small'
        extra={<Button type="primary" onClick={this.saveValues}>保存</Button>}
      >
        {
          list.map((item, index) =>
            <Descriptions.Item key={item.deptID} label={item.deptName}>
              <InputNumber min={0} value={item.maxNum} onChange={value => this.changeValue(index, value)} />
            </Descriptions.Item>)
        }

      </ Descriptions>
    )
  }
}

export default SetMaxRecommended