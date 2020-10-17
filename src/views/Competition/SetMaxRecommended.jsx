import React from 'react'
import { Descriptions, InputNumber, Button, message, Space } from 'antd'

import { getDepartmentLimitInCompetition, setDepartmentLimitInCompetition } from '../../services/administer/competition'

class SetMaxRecommended extends React.Component {

  constructor(...props) {
    super(...props)
    this.state = {
      list: [],
      default: 1
    }
  }
  componentDidMount() {
    getDepartmentLimitInCompetition({ id: this.props.id }).then(res => {
      if (res.result) {
        const list = JSON.parse(res.data).filter(item => item.departmentId !== "0")
        console.log(list)
        this.setState({ list })
      }
    })

  }

  changeValue = (index, value) => {
    console.log(index, value)
    let list = this.state.list
    list[index].limitNum = value
    this.setState({ list })
  }

  setDefault = () => {
    let list = this.state.list
    list.forEach(item => { item.limitNum = this.state.default })
    this.setState({ list })
  }

  saveValues = async () => {
    const list = this.state.list.filter(item => item.limitNum !== null)
      .map(item => ({
        departmentId: item.departmentId,
        limitNum: item.limitNum
      }))

    const params = {
      competitionId: this.props.id,
      limitjson: JSON.stringify(list)
    }
    const result = await setDepartmentLimitInCompetition(params)
    console.log(result)
    if (result.result) {
      message.success({
        content: result.data,
        style: {
          marginTop: '40vh',
          fontSize:20,
          minHeight:30
        },
      })
    }
    else{
      message.error({
        content: result.message,
        style: {
          marginTop: '40vh',
          fontSize:20,
          minHeight:30
        },
      })
    }
  }

  render() {
    const { list } = this.state
    const title = (
      <div>
        <h3>各部门推荐人数限制</h3>

        <small>默认推荐人数：</small>
        <InputNumber
          size='small'
          precision={0}
          min={0}
          value={this.state.default}
          onChange={value => this.setState({ default: value })}
        />
        <Button onClick={this.setDefault} size='small' type='link'>设置</Button>


      </div >
    )
    return (
      <Descriptions
        title={title}
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