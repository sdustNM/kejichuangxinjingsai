import React, { Component } from 'react'
import { Descriptions, Empty } from 'antd'
import AppendixList from '../../../AppendixList'
import { getCompetitionByID } from '../../../../../services/Achievements'

export default class RepeatCompetitionDetail extends Component {
    state = {
        competition: null
    }
    componentDidMount() {
        this.getCompetition(this.props.competitionID)
    }
    componentDidUpdate(preProps) {
        const id = this.props.competitionID
        if (id === preProps.competitionID) return
        this.getCompetition(id)
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }

    getCompetition = async id => {
        if (id) {
            const res = await getCompetitionByID({ id })
            console.log(res)
            if (res.result) {
                const competition = JSON.parse(res.data)
                this.setState({ competition })
            }
        }
    }

    render() {
        const { competition } = this.state
        return (
            competition ? <Descriptions
                bordered
                size='small'
                column={3}
                title={`竞赛成果详细信息(编号：${competition.编号})`}
            >
                {/* <Descriptions.Item label={<strong>编号</strong>}>{info.编号}</Descriptions.Item> */}
                <Descriptions.Item label={<strong>竞赛名称</strong>} span={3}>{competition.竞赛名称}</Descriptions.Item>
                <Descriptions.Item label={<strong>竞赛等级</strong>}>{competition.等级}</Descriptions.Item>
                <Descriptions.Item label={<strong>竞赛类别</strong>}>{competition.类别}</Descriptions.Item>
                <Descriptions.Item label={<strong>竞赛组别</strong>}>{competition.组别}</Descriptions.Item>

                <Descriptions.Item label={<strong>获奖等级</strong>}>{`${competition.获奖等级}${competition.单项奖名称 == null ? "" : "-" + competition.单项奖名称}`}</Descriptions.Item>
                <Descriptions.Item label={<strong>主办单位</strong>} span={2}>{competition.主办单位}</Descriptions.Item>
                <Descriptions.Item label={<strong>获奖时间</strong>}>{competition.获奖时间}</Descriptions.Item>
                <Descriptions.Item label={<strong>作品名称</strong>}>{competition.作品名称}</Descriptions.Item>
                <Descriptions.Item label={<strong>证书编号</strong>}>{competition.证书编号}</Descriptions.Item>
                <Descriptions.Item label={<strong>第一负责人</strong>} span={3}>
                    <Descriptions size='small' column={6} bordered layout='vertical'>
                        <Descriptions.Item label='学号'>{competition.学号}</Descriptions.Item>
                        <Descriptions.Item label='姓名'>{competition.学生姓名}</Descriptions.Item>
                        <Descriptions.Item label='学历'>{competition.学历层次}</Descriptions.Item>
                        <Descriptions.Item label='学院'>{competition.学院}</Descriptions.Item>
                        <Descriptions.Item label='班级'>{competition.班级}</Descriptions.Item>
                        <Descriptions.Item label='联系方式'>{competition.联系方式}</Descriptions.Item>
                    </Descriptions>
                </Descriptions.Item>
                <Descriptions.Item label={<strong>团队其他成员</strong>} span={3}>
                    {competition.成员列表 || '无'}
                </Descriptions.Item>
                <Descriptions.Item label={<strong>第一指导教师</strong>} span={3}>
                    {competition.第一指导教师 ? (<Descriptions size='small' column={3} bordered layout='vertical'>
                        <Descriptions.Item label='姓名'>{competition.第一指导教师}</Descriptions.Item>
                        <Descriptions.Item label='单位'>{competition.教师单位}</Descriptions.Item>
                    </Descriptions>) : '无'}
                </Descriptions.Item>
                <Descriptions.Item label={<strong>其他指导教师</strong>} span={3}>
                    {competition.其他指导教师 || '无'}
                </Descriptions.Item>

                <Descriptions.Item label={<strong>获奖证书</strong>} span={3}>
                    {competition.rewardAppendix.length > 0 ? <AppendixList fileList={competition.rewardAppendix} /> : '无'}
                </Descriptions.Item>
                <Descriptions.Item label={<strong>获奖通知</strong>} span={3}>
                    {competition.rewardNoticeAppendix.length > 0 ? <AppendixList fileList={competition.rewardNoticeAppendix} /> : '无'}
                </Descriptions.Item>
                <Descriptions.Item label={<strong>指导教师证书</strong>} span={3}>
                    {competition.supportAppendix.length > 0 ? <AppendixList fileList={competition.supportAppendix} /> : '无'}
                </Descriptions.Item>
                <Descriptions.Item label={<strong>备注</strong>} span={3}>{competition.备注}</Descriptions.Item>

                {(competition.State >= 2 || competition.State == -1) && <Descriptions.Item label={<strong>审核结果</strong>} span={3}>
                    <Descriptions size='small' column={3} bordered >
                        <Descriptions.Item label='学院意见' span={3}>{competition.学院意见}</Descriptions.Item>
                        {(competition.State >= 3 || competition.State == -1) && <Descriptions.Item label='学校意见' span={3}>{competition.学校意见}</Descriptions.Item>}
                    </Descriptions>
                </Descriptions.Item>}
            </Descriptions> : <Empty />
        )
    }
}
