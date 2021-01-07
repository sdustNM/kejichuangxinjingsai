import React, { Component } from 'react'
import { Card, Space, DatePicker } from 'antd'
import MyPie from './MyPie';
import MyColumn from './MyColumn';
import { getTj } from '../../services/Dashboard';
import moment from "moment"

const { RangePicker } = DatePicker

export default class Chart extends Component {
    state = {
        startYear: moment().format('YYYY'),
        endYear: moment().format('YYYY'),
        articleData: null,
        patentData: null,
        competitionData: null,
        departmentTotal: null
    }
    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        const params = {
            startYear: this.state.startYear,
            endYear: this.state.endYear
        }
        console.log(params)
        const res = await getTj(params)
        if (res.result) {
            const data = JSON.parse(res.data)
            //console.log(data)
            const articleData = data.articleTj
            const patentData = data.patentTj
            const competitionData = data.competitionTj
            const articleInDepartment = data.articleInDepartment.filter(item => item.id != null).map(item => { item.achievement = '论文'; return item })
            const patentInDepartment = data.patentInDepartment.filter(item => item.id != null).map(item => { item.achievement = '专利'; return item })
            const competitionInDepartment = data.competitionInDepartment.filter(item => item.id != null).map(item => { item.achievement = '竞赛'; return item })
            const departmentTotal = articleInDepartment.concat(patentInDepartment).concat(competitionInDepartment)

            this.setState({
                articleData,
                patentData,
                competitionData,
                departmentTotal
            })
        }
    }

    changeYear = (dates, dateStrings) => {
        //console.log(dateStrings)
        this.setState({
            startYear: dateStrings[0],
            endYear: dateStrings[1]
        }, this.getData)
    }

    render() {
        const { startYear, endYear, articleData, patentData, competitionData, departmentTotal } = this.state
        const title = <Space>
            <span>起止年份</span>
            <RangePicker
                allowClear={false}
                picker="year"
                value={[moment(startYear, 'YYYY'), moment(endYear, 'YYYY')]}
                onChange={this.changeYear} />
        </Space>
        return (
            <Card title={title}>
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
