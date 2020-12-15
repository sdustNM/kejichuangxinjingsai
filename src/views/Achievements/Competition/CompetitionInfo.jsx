import React, { Component } from 'react'
import { Card, Descriptions } from 'antd'
import AppendixList from '../AppendixList'

class CompetitionInfo extends Component {
    render() {
        const info = this.props.info
        return (
            <Card>
                <Descriptions
                    bordered
                    size={this.props.size}
                    column={3}
                    title={`竞赛成果详细信息(编号：${info.编号})`}
                >
                    {/* <Descriptions.Item label={<strong>编号</strong>}>{info.编号}</Descriptions.Item> */}
                    <Descriptions.Item label={<strong>竞赛名称</strong>}>{info.竞赛名称}</Descriptions.Item>
                    <Descriptions.Item label={<strong>竞赛等级</strong>}>{info.等级}</Descriptions.Item>
                    <Descriptions.Item label={<strong>获奖等级</strong>}>{`${info.获奖等级}${info.单项奖名称 == null ? "" : "-" + info.单项奖名称}`}</Descriptions.Item>

                    <Descriptions.Item label={<strong>竞赛类别</strong>}>{info.类别}</Descriptions.Item>
                    <Descriptions.Item label={<strong>竞赛组别</strong>}>{info.组别}</Descriptions.Item>
                    <Descriptions.Item label={<strong>主办单位</strong>}>{info.主办单位}</Descriptions.Item>
                    <Descriptions.Item label={<strong>获奖时间</strong>}>{info.获奖时间}</Descriptions.Item>
                    <Descriptions.Item label={<strong>作品名称</strong>}>{info.作品名称}</Descriptions.Item>
                    <Descriptions.Item label={<strong>证书编号</strong>}>{info.证书编号}</Descriptions.Item>
                    <Descriptions.Item label={<strong>第一负责人</strong>} span={3}>
                        <Descriptions size='small' column={6} bordered layout='vertical'>
                            <Descriptions.Item label='学号'>{info.学号}</Descriptions.Item>
                            <Descriptions.Item label='姓名'>{info.学生姓名}</Descriptions.Item>
                            <Descriptions.Item label='学历'>{info.学历层次}</Descriptions.Item>
                            <Descriptions.Item label='学院'>{info.学院}</Descriptions.Item>
                            <Descriptions.Item label='班级'>{info.班级}</Descriptions.Item>
                            <Descriptions.Item label='联系方式'>{info.联系方式}</Descriptions.Item>
                        </Descriptions>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>团队其他成员</strong>} span={3}>
                        {info.成员列表 || '无'}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>第一指导教师</strong>} span={3}>
                        {info.第一指导教师 ? (<Descriptions size='small' column={3} bordered layout='vertical'>
                            <Descriptions.Item label='姓名'>{info.第一指导教师}</Descriptions.Item>
                            <Descriptions.Item label='单位'>{info.教师单位}</Descriptions.Item>
                        </Descriptions>) : '无'}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>其他指导教师</strong>} span={3}>
                        {info.其他指导教师 || '无'}
                    </Descriptions.Item>

                    <Descriptions.Item label={<strong>获奖证书</strong>} span={3}>
                        {info.rewardAppendix.length > 0 ? <AppendixList fileList={info.rewardAppendix} /> : '无'}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>获奖通知</strong>} span={3}>
                        {info.rewardNoticeAppendix.length > 0 ? <AppendixList fileList={info.rewardNoticeAppendix} /> : '无'}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>指导教师证书</strong>} span={3}>
                        {info.supportAppendix.length > 0 ? <AppendixList fileList={info.supportAppendix} /> : '无'}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>备注</strong>} span={3}>{info.备注}</Descriptions.Item>

                    {(info.State >= 2 || info.State == -1) && <Descriptions.Item label={<strong>审核结果</strong>} span={3}>
                        <Descriptions size='small' column={3} bordered >
                            <Descriptions.Item label='学院意见' span={3}>{info.学院意见}</Descriptions.Item>
                            {(info.State >= 3 || info.State == -1) && <Descriptions.Item label='学校意见' span={3}>{info.学校意见}</Descriptions.Item>}
                        </Descriptions>
                    </Descriptions.Item>}
                </Descriptions>

            </Card>
        )
    }
}

export default CompetitionInfo
