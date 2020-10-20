import React from 'react'
import { Steps, Popover,Button,Space,Row,message } from 'antd';
import {useState,useEffect} from 'react'
import {getCompetitionState,startCompetition,yuanNotice,endCompetition} from '../../services/competitionState/index'
import { isSuperAdminister } from '../../utils/auth'
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
      if (res.result) {
        //console.log(res);
        if (res.data==="null") return;
        var currentStatus = JSON.parse(res.data);
        if (currentStatus) {
          var temp = global.constants.XiaoCompetitionStatusMatch.filter(x => x.a === currentStatus.statusId)[0];
          if (temp) var tt = temp.b

          //console.log(temp)
          setcIndex(tt)
        }
      }
    });

  })

  const handleStartCompetition = () => {
    startCompetition({ "id": props.id }).then(res => {
      if (res.result) {
        message.success(res.data)
        setcIndex(1)
      }
      else {
        message.error(res.message)
      }
    })
  }

  const handleEndCompetition = () => {
    endCompetition({ "id": props.id }).then(res => {
      if (res.result) {
        message.success(res.data)
        setcIndex(0)
      }
      else {
        message.error(res.message)
      }
    })
  }

  const getStepState = (index) => {
    return index < cIndex || cIndex==7 ? "完成" : (index === cIndex ? "进行中..." : "等待")
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
                  <Button type="primary" onClick={handleStartCompetition} disabled={cIndex>1}>比赛发布</Button>
                  说明：发布比赛后，学生可以查看比赛信息，提交项目作品。
              </Space>
              </Row>
              <Row style={{ marginTop: 20, paddingLeft: 50 }}>
                <Space>
                  <Button type="primary" onClick={handleEndCompetition} disabled={cIndex>=7}>比赛结束</Button>
                  说明：比赛结束后，学生可以查看本人作品最终得分及推荐信息。
              </Space>
              </Row>
            </div>)
        }


      </Space>
    </div>)
}

export default CompetitionStatus;