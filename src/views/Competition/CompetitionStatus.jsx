import React from 'react'
import { Steps, Popover,Button,Space,Row,message } from 'antd';
import {useState,useEffect} from 'react'
import {getCompetitionState} from '../../services/competition/index'
import {startCompetition} from '../../services/competition/index'
const { Step } = Steps;

const CompetitionStatus=(props)=>{

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
  getCompetitionState({"id":props.id}).then(res=>{
    if (res.data.result)
    {
      var currentStatus= res.data.data;
      var temp=global.constants.XiaoCompetitionStatusMatch.filter(x=>x.a===currentStatus)[0];
      if (temp) var tt=temp.b
      
      //console.log(tt)
      setcIndex(tt)
    }
  });

})

const handleStartCompetition=()=>
{
   startCompetition({"id":props.id}).then(res=>{
     if (res.data.result)
     {
       message.success(res.data.data)
       setcIndex(1)
     }
     else {
       message.error(res.data.message)
     }
   })
}

const getStepState=(index)=>
{
    return index<cIndex? "完成": (index===cIndex?"进行中...":"等待")
}

return (
  <div style={{paddingTop:50}}>
      <Space direction="vertical">
  <Steps current={cIndex} progressDot={customDot}>
    {global.constants.XiaoCompetitionStatus.map(item=>{
      return (
        <Step description={getStepState(item.b)} key={item.a} title={item.a} />
      )

    })}
  </Steps>
  <Row style={{marginTop:20, paddingLeft:50}}><Button type="primary" onClick={handleStartCompetition}>发布比赛</Button></Row>
    
  </Space>
  </div>)
}

export default CompetitionStatus;