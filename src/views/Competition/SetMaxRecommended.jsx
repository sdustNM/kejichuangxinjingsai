import React from 'react'
import { Descriptions, InputNumber, Button, message } from 'antd'

import { getDepartmentLimitInCompetition, setDepartmentLimitInCompetition } from '../../services/administer/competition'

class SetMaxRecommended extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  componentDidMount() {
    getDepartmentLimitInCompetition({id: this.props.id}).then(res => {
      if(res.data.result){
        const list = JSON.parse(res.data.data).filter(item => item.departmentId !== "0")
        console.log(list)
        this.setState({ list })
      }
    })
    
  }

  changeValue = (index, value) => {
    console.log(index, value)
    let list = this.state.list
    list[index].limitNum = value
    this.setState({
      list
    })
  }

  saveValues = async () => {
    const list = this.state.list.filter(item => item.limitNum !== null)
    //console.log(list)
    //console.log(JSON.stringify(list))
    const params = {
      competitionId: this.props.id,
      limitjson: JSON.stringify(list)
    }
    const result = await setDepartmentLimitInCompetition(params)
    console.log(result)
    if(result.data.result){
      message.success("保存成功！")
    }
  }

  render() {
    const { list } = this.state
    return (
      <Descriptions
        title="各部门推荐人数限制"
        bordered
        size='small'
        extra={<Button type="primary" onClick={this.saveValues}>保存</Button>}
      >
        {
          list.map((item, index) =>
            <Descriptions.Item key={item.departmentId} label={item.departmentName}>
              <InputNumber min={0} value={item.limitNum} onChange={value => this.changeValue(index, value)} />
            </Descriptions.Item>)
        }

      </ Descriptions>
    )
  }
}

export default SetMaxRecommended