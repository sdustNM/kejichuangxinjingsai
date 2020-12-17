import React, { Component } from 'react'
import { Card } from 'antd'
import { Column } from '@ant-design/charts';

export default class MyColumn extends Component {
    render() {
        const { data } = this.props
        //console.log(data)
        const config = {
            data: data,
            isGroup: true,
            xField: 'name',
            yField: 'cnt',
            seriesField: 'achievement',
            legend: {
                layout: 'verticle',
                position: 'right'
            },
            //scrollbar: { type: 'horizontal'},
            // slider: {
            //     start: 0,
            //     end: 0.1
            // },
            color: ['#2B6ACC', '#BD6ECC', '#2EC9CC'],
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
            <Card title='学院成果统计'>
                <Column {...config} />
            </Card>
        )
    }
}
