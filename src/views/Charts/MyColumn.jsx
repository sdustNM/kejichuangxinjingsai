import React, { Component } from 'react'
import { Card } from 'antd'
import { Column } from '@ant-design/charts';

export default class MyColumn extends Component {
    render() {
        const { data } = this.props
        console.log(data)
        const config = {
            data: data,
            isGroup: true,
            xField: 'name',
            yField: 'number',
            seriesField: 'achievement',
            //scrollbar: { type: 'horizontal'},
            // slider: {
            //     start: 0,
            //     end: 0.1
            // },
            color: ['red', 'green', 'blue'],
            columnWidthRatio: 0.8,
            marginRatio: 0.2,
            xAxis: {
                label: {
                    autoRotate: true
                }
            },
            label: {
                position: 'middle',
                layout: [
                    { type: 'interval-adjust-position' },
                    { type: 'interval-hide-overlap' },
                    { type: 'adjust-color' }
                ]
            }
        }
        return (
            <Card>
                <Column {...config} />
            </Card>
        )
    }
}
