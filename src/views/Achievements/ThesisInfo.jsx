import React, { Component } from 'react'
import { Card, Descriptions } from 'antd'

export default class ThesisInfo extends Component {
    render() {
        return (
            <Card>
                <Descriptions
                    bordered
                    column={2}
                    title='论文信息'
                >
                    <Descriptions.Item label={<strong>作品名称</strong>} span={2}>{project.name}</Descriptions.Item>
                </Descriptions>
            </Card>
        )
    }
}
