import React, { Component } from 'react'
import { Card, Space } from 'antd'
import MyPie from './MyPie';

export default class Chart extends Component {
    state = {
        articleData: null,
        patentData: null,
        competitionData: null
    }
    componentDidMount() {
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
                type: 'A类',
                value: 27,
            },
            {
                type: 'B类',
                value: 25,
            },
            {
                type: 'C类',
                value: 18,
            },
            {
                type: '其他',
                value: 36,
            }
        ]

        this.setState({
            articleData,
            patentData,
            competitionData
        })
    }
    render() {
        const { articleData, patentData, competitionData } = this.state
        return (
            <Card>
                <Space>
                    {articleData && <MyPie title='论文统计' data={articleData} />}
                    {patentData && <MyPie title='专利统计' data={patentData} />}
                    {competitionData && <MyPie title='竞赛统计' data={competitionData} />}
                </Space>
            </Card>
        )
    }
}
