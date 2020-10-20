import React from 'react'
import { Space, Button } from 'antd'

import { getUserID } from '../../../utils/auth'
import { getSimpleProjectList } from '../../../services/project'
import { getProjectOperationState, getCompetitionState } from '../../../services/competitionState';


class CompetitionProjectState extends React.Component {

  constructor(...props) {
    super(...props)
    this.state = {
      competitionID: null,
      projectID: null,
      competitionState: null,
      projectOperationState: null
    }
  }

  async componentDidMount() {
    //获取比赛ID
    const competitionID = this.props.competitionID

    //获取比赛状态
    let competitionState = ''
    let competitionStateResult = await getCompetitionState({ id: competitionID })
    if (competitionStateResult.result) {
      let statusObj = JSON.parse(competitionStateResult.data)
      if (statusObj) {
        competitionState = statusObj.statusId
      }
    }

    //获取用户是否参赛并获取作品状态
    let projectID
    let projectOperationState
    const params = {
      competitionID,
      studentId: getUserID()
    }
    let projectListResult = await getSimpleProjectList(params)
    if (projectListResult.result) {
      const list = JSON.parse(projectListResult.data).list
      if (list.length > 0) {
        projectID = list[0].x.Id
        let projectStateResult = await getProjectOperationState({ ProjectId: projectID })
        //console.log(projectStateResult)
        if (projectStateResult.result) {
          projectOperationState = projectStateResult.data
        }
      }
    }


    this.setState({ competitionID, projectID, competitionState, projectOperationState })
  }

  render() {
    console.log(this.state)
    const { competitionID, projectID, competitionState, projectOperationState } = this.state

    let tip
    let buttonDisabled = false
    let buttonValue = '参加比赛'
    if (!projectID) { //还未提交作品
      if (competitionState === '') {
        alert('获取比赛状态失败！')
        buttonDisabled = true
      } else if (competitionState === '1') {
        tip = '耐心等候，还未到比赛提交作品时间';
        buttonDisabled = true
      } else if (competitionState === '1.1') {
        tip = '';//'未参赛，点击按钮提交参赛作品'
      } else {
        tip = '很遗憾，报名时间已过'
        buttonDisabled = true
      }
    } else { //已提交作品
      if (projectOperationState === 'W') {
        tip = '作品在修改期内，点击按钮可编辑作品'
        buttonValue = '编辑作品'
      } else {
        tip = '作品不在修改期内，点击按钮可查看作品'
        buttonValue = '查看作品'
      }
    }

    return (
      <Space>
        <span style={{ color: 'red' }}>{tip}</span>
        <Button
          type='primary'
          disabled={buttonDisabled}
          onClick={() =>
            this.props.history.push({
              pathname: projectOperationState === 'W' ? '/student/projectEdit' : '/student/projectInfo',
              state: { projectID, competitionID }
            })}
        >
          {buttonValue}
        </Button>
      </Space>
    )
  }
}

export default CompetitionProjectState