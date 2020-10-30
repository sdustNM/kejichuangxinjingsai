import React, { Component } from 'react'
import { Select, message } from 'antd'

import { setProjectResult_xiao } from '../../../services/projectRecommend'

const { Option } = Select

export default class Awards extends Component {

    handleChange = async value => {
        const params = {
            projectId: this.props.projectID,
            level: value
        }
        const res = await setProjectResult_xiao(params)
        if (res.result) {
            message.success('作品评奖成功！')
        }
    }

    render() {
        const { list, projectID, value, isEnd } = this.props
        //console.log(list, projectID, value)
        return (
            <Select
                disabled={isEnd}
                defaultValue={value}
                style={{ width: 120 }}
                bordered={false}
                onChange={this.handleChange}>
                {list.map(item => <Option key={projectID + '_' + item.Id} value={item.Id}>{item.Name}</Option>)}
            </Select>
        )
    }
}
