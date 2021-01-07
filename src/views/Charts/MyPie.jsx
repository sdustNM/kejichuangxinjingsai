import React, { Component } from 'react'
import { Card } from 'antd'
import { Pie } from '@ant-design/charts';

class MyPie extends Component {
    render() {
        const { title, data } = this.props
        const config = {
            appendPadding: 1,
            width: 400, 
            height: 300,
            data: data,
            angleField: 'value',
            colorField: 'type',
            radius: 0.5,
            legend: {
                layout: 'horizontal',
                position: 'bottom'
            },
            label: {
                type: 'spider',
                labelHeight: 40,
                content: '{name}\n{value}({percentage})',
                style: {
                    //opacity: 0.6,
                    fontSize: 12
                  },
              },
            interactions: [
                { type: 'element-selected' },
                { type: 'element-active' },
            ],

        }
        return (
            <Card>
                <Pie {...config} />
            </Card>
        )
    }
}

export default MyPie
