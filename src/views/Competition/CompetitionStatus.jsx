import React from 'react'
import { Steps, Popover } from 'antd';
import {useState,useEffect} from 'react'

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
  var tt=global.constants.XiaoCompetitionStatus.filter(x=>x.a==="学院公示")[0].b
  setcIndex(tt)
}, [])

const getStepState=(index)=>
{
    return index<cIndex? "完成": (index===cIndex?"进行中...":"等待")
}

return (
  <div style={{paddingTop:50}}>
  <Steps current={cIndex} progressDot={customDot}>
    {global.constants.XiaoCompetitionStatus.map(item=>{
      return (
        <Step description={getStepState(item.b)} key={item.a} title={item.a} />
      )

    })}
  </Steps>
  </div>)
}

export default CompetitionStatus;