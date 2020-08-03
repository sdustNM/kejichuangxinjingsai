import React from 'react'
import { Space, Button } from 'antd'

import { getUserID } from '../../../utils/auth'
import { getSimpleProjectList } from '../../../services/project'
import { getProjectOperationState, getCompetitionState } from '../../../services/competitionState';


class CompetitionProjectState extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      competitionID: null,
      projectID: null,
      competitionState: null
    }
  }

  componentDidMount() {
    this.setState({
      competitionID: this.props.competitionID
    })
    //获取用户是否参赛
    const params = {
      competitionID: this.props.competitionID,
      studentId: getUserID()
    }
    console.log(params)
    getSimpleProjectList(params).then(res => {
      if (res.data.result) {
        //console.log(res)
        const list = JSON.parse(res.data.data).list
        //console.log(list)
        if (list.length > 0) {
          //console.log(list[0].x.Id)
          this.setState({
            projectID: list[0].x.Id
          })
        }
      }
    })

    getCompetitionState({id: this.props.competitionID}).then(res=>{
      if(res.data.result){
        this.setState({
          competitionState: res.data.data
        })
      }
    })

  }

  render() {
    //console.log(this.state)
    const { competitionID, projectID, competitionState } = this.state
    let tip = ''
    let state = ''
    if (!projectID) { //
      if (competitionState === '1.1') {
        tip = '';//'未参赛，点击按钮提交参赛作品'
        state = 0
      } else {
        tip = '很遗憾，报名时间已过'
      }
    } else {
      if (competitionState === '1.1') {
        tip = '已参赛，提交作品期间内，作品可以修改，点击按钮可编辑作品'
        state = 1
      } else {
        tip = '已参赛，提交作品时间已过，作品不可修改，点击按钮可查看作品'
        state = 2
      }
    }
    let button = null
    if (state === 0) {
      button = (
        <Button
          type='primary'
          onClick={() => this.props.history.push({ pathname: '/student/projectEdit', state: { competitionID } })}
        >参加比赛</Button>
      )
    } else if (state === 1) {
      button = (
        <Button
          type='primary'
          onClick={() => this.props.history.push({ pathname: '/student/projectEdit', state: { projectID, competitionID } })}
        >编辑作品</Button>
      )
    } else if (state === 2) {
      button = (
        <Button
          type='primary'
          onClick={() => this.props.history.push({ pathname: '/student/projectInfo', state: { projectID, competitionID } })}
        >查看作品</Button>
      )
    }

    //console.log(projectID)
    return (
      <Space>
        <span style={{ color: 'red' }}>{tip}</span>
        {button}
      </Space>
    )
  }
}

export default CompetitionProjectState