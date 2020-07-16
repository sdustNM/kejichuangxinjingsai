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
          let submitStart = !item.submitStart ? null : moment(item.submitStart, 'YYYY-MM-DD HH:mm')
          let submitEnd = !item.submitEnd ? null : moment(item.submitEnd, 'YYYY-MM-DD HH:mm')
          let yuan_appraiseStart = !item.yuan_appraiseStart ? null : moment(item.yuan_appraiseStart, 'YYYY-MM-DD HH:mm')
          let yuan_appraiseEnd = !item.yuan_appraiseEnd ? null : moment(item.yuan_appraiseEnd, 'YYYY-MM-DD HH:mm')
          let appraiseStart = !item.appraiseStart ? null : moment(item.appraiseStart, 'YYYY-MM-DD HH:mm')
          let appraiseEnd = !item.appraiseEnd ? null : moment(item.appraiseEnd, 'YYYY-MM-DD HH:mm')

        }
      })


    }
  }

  render() {
    return (
      <div>
        <Descriptions
          title={`${competition.name}(${competition.id})`}
          column={1}>
          <Descriptions.Item label="组织单位">{competition.fromUnit}</Descriptions.Item>
          <Descriptions.Item label="比赛级别">{competition.category}选拔</Descriptions.Item>
          <Descriptions.Item label="报名开始">{competition.submitStart}</Descriptions.Item>
          <Descriptions.Item label="报名结束">{competition.submitEnd}</Descriptions.Item>
          <Descriptions.Item label="比赛说明">{competition.description}</Descriptions.Item>
          <Descriptions.Item label="备注">{competition.remark}</Descriptions.Item>
          <Descriptions.Item label="附件"></Descriptions.Item>
        </Descriptions>
        <Card>
          <List
            size="small"
            //bordered
            dataSource={this.state.fileList}
            renderItem={item => (
              <List.Item>
                <a
                  href={appRoot + item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              </List.Item>)}
          />
        </Card>
      </div>
    )
  }
}

export default CompetitionEditForm