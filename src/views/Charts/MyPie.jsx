import React, { Component } from 'react'
import { Card } from 'antd'
import { Pie } from '@ant-design/charts';

class MyPie extends Component {
    render() {
        const { title, data } = this.props
        const config = {
            appendPadding: 10,
            width: 240,
            data: data,
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            innerRadius: 0.6,

            legend: {
                layout: 'horizontal',
                position: 'bottom'
            },
            label: {
                type: 'inner',
                offset: '-50%',
                content: '{value}',
                autoRotate: false,
                style: {
                    textAlign: 'center',
                    fontSize: 14,
                },
            },
            interactions: [
                { type: 'element-selected' },
                { type: 'element-active' },
                { type: 'pie-statistic-active' }
            ],

        }
        return (
            <Card title={title}>
                <Pie {...config} />
            </Card>
        )
    }
}

export default MyPie
