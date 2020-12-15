import React, { Component } from 'react'
import { Card, Space } from 'antd'
import getDepartmentList from '../../redux/common'

import MyPie from './MyPie';
import MyColumn from './MyColumn';

export default class Chart extends Component {
    state = {
        articleData: null,
        patentData: null,
        competitionData: null,
        departmentTotal: null
    }
    async componentDidMount() {
        const articleData = [
            {
                type: '中文核心',
                value: 27,
            },
            {
                type: 'EI',
                value: 25,
            },
            {
                type: 'SCI',
                value: 18,
            },
            {
                type: 'SSCI(社会科学类)',
                value: 15,
            },
            {
                type: 'ISTP',
                value: 10,
            },
            {
                type: 'A&HCI',
                value: 10,
            },
            {
                type: '其他',
                value: 5,
            },
        ];
        const patentData = [
            {
                type: '发明',
                value: 27,
            },
            {
                type: '实用新型',
                value: 25,
            },
            {
                type: '外观设计',
                value: 18,
            }
        ]
        const competitionData = [
            {
                type: '国赛',
                value: 27,
            },
            {
                type: '省赛',
                value: 25,
            },
            {
                type: '市赛',
                value: 18,
            }
        ]
        const res = await getDepartmentList()
        let departmentTotal = []
        JSON.parse(res).map(item => {
            if (item.id != 0) {
                departmentTotal.push({
                    id: item.id,
                    name: item.name,
                    number: Math.floor(Math.random() * 100),
                    achievement: '论文'
                }, {
                    id: item.id,
                    name: item.name,
                    number: Math.floor(Math.random() * 10),
                    achievement: '专利'
                }, {
                    id: item.id,
                    name: item.name,
                    number: Math.floor(Math.random() * 20),
                    achievement: '竞赛'
                })
            }
        })

        this.setState({
            articleData,
            patentData,
            competitionData,
            departmentTotal
        })
    }
    render() {
        const { articleData, patentData, competitionData, departmentTotal } = this.state
        return (
            <Card>
                <Space size='large'>
                    {articleData && <MyPie title='论文统计' data={articleData} />}
                    {patentData && <MyPie title='专利统计' data={patentData} />}
                    {competitionData && <MyPie title='竞赛统计' data={competitionData} />}
                </Space>
                {departmentTotal && <MyColumn data={departmentTotal} />}
            </Card>
        )
    }
}
