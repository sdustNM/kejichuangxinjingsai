import React from 'react'
<<<<<<< HEAD
import { Steps, Popover, Button, Space, Row, message } from 'antd';
import { useState, useEffect } from 'react'
import { getCompetitionState } from '../../services/competitionState/index'
import { startCompetition, yuanNotice, endCompetition } from '../../services/competitionState/index'
import { isSuperAdminister } from '../../utils/auth';
=======
import { Steps, Popover,Button,Space,Row,message } from 'antd';
import {useState,useEffect} from 'react'
import {getCompetitionState,startCompetition,yuanNotice,endCompetition} from '../../services/competitionState/index'
>>>>>>> 8621081afbddcbc28b6f0cf9b7e0c593f1b78429
const { Step } = Steps;

const CompetitionStatus = (props) => {

  const [cIndex, setcIndex] = useState(0)
  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );
  useEffect(() => {
    //console.log(props.id);
    getCompetitionState({ "id": props.id }).then(res => {
      if (res.data.result) {
        var currentStatus = res.data.data;
        var temp = global.constants.XiaoCompetitionStatusMatch.filter(x => x.a === currentStatus)[0];
        if (temp) var tt = temp.b

        //console.log(tt)
        setcIndex(tt)
      }
    });

  })

  const handleStartCompetition = () => {
    startCompetition({ "id": props.id }).then(res => {
      if (res.data.result) {
        message.success(res.data.data)
        setcIndex(0)
      }
      else {
        message.error(res.data.message)
      }
    })
  }

  const handleYuanNotice = () => {
    yuanNotice({ "id": props.id }).then(res => {
      if (res.data.result) {
        message.success(res.data.data)
        setcIndex(0)
      }
      else {
        message.error(res.data.message)
      }
    })
  }

  const handleEndCompetition = () => {
    endCompetition({ "id": props.id }).then(res => {
      if (res.data.result) {
        message.success(res.data.data)
        setcIndex(0)
      }
      else {
        message.error(res.data.message)
      }
    })
  }

  const getStepState = (index) => {
    return index < cIndex ? "完成" : (index === cIndex ? "进行中..." : "等待")
  }

  return (
    <div style={{ paddingTop: 50 }}>
      <Space direction="vertical">
        <Steps current={cIndex} progressDot={customDot}>
          {global.constants.XiaoCompetitionStatus.map(item => {
            return (
              <Step description={getStepState(item.b)} key={item.a} title={item.a} />
            )

          })}
        </Steps>

        {
          isSuperAdminister() && (
            <div>
              <Row style={{ marginTop: 20, paddingLeft: 50 }}>
                <Space>
                  <Button type="primary" onClick={handleStartCompetition}>正式发布比赛</Button>
                  说明：发布比赛后，学生可以查看比赛信息，提交项目作品。
              </Space>
              </Row>
              <Row style={{ marginTop: 20, paddingLeft: 50 }}>
                <Space>
                  <Button type="primary" onClick={handleYuanNotice}>学院评比公示</Button>
                  说明：学院公示后，学生可以查看本人作品得分及推荐信息，同时允许进行作品编辑。
              </Space>
              </Row>

              <Row style={{ marginTop: 20, paddingLeft: 50 }}>
                <Space>
                  <Button type="primary" onClick={handleEndCompetition}>项目公示及结束</Button>
                  说明：学校公示后，学生可以查看本人作品最终得分及推荐信息，项目结束。
              </Space>
              </Row>
            </div>)
        }


      </Space>
    </div>)
}

export default CompetitionStatus;