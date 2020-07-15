import React from 'react'
import { Descriptions } from 'antd'
import { getCompetitionByID } from '../../../services/administer/competition'
import { getDeptID } from '../../../utils/auth'

const { TextArea } = Input

class CompetitionEditForm extends React.Component {
  componentDidMount() {
    //console.log(this.props)
    const { id } = this.props
    if (id) {
      getCompetitionByID(id).then(res => {
        if (res.data.result) {
          let item = JSON.parse(res.data.data)
          let submitStart = !item.submitStart ? null : moment(item.submitStart, 'YYYY-MM-DD')
          let submitEnd = !item.submitEnd ? null : moment(item.submitEnd, 'YYYY-MM-DD')
          let appraiseStart = !item.appraiseStart ? null : moment(item.appraiseStart, 'YYYY-MM-DD')
          let appraiseEnd = !item.appraiseEnd ? null : moment(item.appraiseEnd, 'YYYY-MM-DD')
          this.formRef.current.setFieldsValue({
            name: item.name,
            fromUnit: item.fromUnit,
            submitTime: [submitStart, submitEnd],
            appraiseTime: [appraiseStart, appraiseEnd],
            description: item.description
          })
        }
      })


    }
  }

  render() {
    return (
      <Descriptions>
        
      </Descriptions>
    )
  }
}

export default CompetitionEditForm