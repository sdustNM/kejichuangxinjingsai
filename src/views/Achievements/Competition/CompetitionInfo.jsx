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
                    title='竞赛成果详细信息'
                >
                    <Descriptions.Item label={<strong>竞赛名称</strong>}>{info.竞赛名称show}</Descriptions.Item>
                    <Descriptions.Item label={<strong>竞赛等级</strong>}>{info.等级}</Descriptions.Item>
                    <Descriptions.Item label={<strong>获奖等级</strong>}>{`${info.获奖等级}${info.单项奖名称==null?"":"-"+info.单项奖名称}`}</Descriptions.Item>
                    
                    <Descriptions.Item label={<strong>竞赛类别</strong>}>{info.类别}</Descriptions.Item>
                    <Descriptions.Item label={<strong>竞赛组别</strong>}>{info.组别}</Descriptions.Item>
                    <Descriptions.Item label={<strong>主办单位</strong>}>{info.主办单位}</Descriptions.Item>
                    <Descriptions.Item label={<strong>获奖时间</strong>}>{info.获奖时间year + '-' + info.获奖时间month}</Descriptions.Item>
                    <Descriptions.Item label={<strong>作品名称</strong>}>{info.作品名称}</Descriptions.Item>
                    <Descriptions.Item label={<strong>证书编号</strong>}>{info.证书编号}</Descriptions.Item>
                    <Descriptions.Item label={<strong>第一负责人</strong>} span={3}>
                        <Descriptions size='small' column={6} bordered layout='vertical'>
                            <Descriptions.Item label='学号'>{info.Sno}</Descriptions.Item>
                            <Descriptions.Item label='姓名'>{info.sname}</Descriptions.Item>
                            <Descriptions.Item label='学历'>{info.学历层次}</Descriptions.Item>
                            <Descriptions.Item label='学院'>{info.DepartmentName}</Descriptions.Item>
                            <Descriptions.Item label='班级'>{info.className}</Descriptions.Item>
                            <Descriptions.Item label='联系方式'>{info.联系方式}</Descriptions.Item>
                        </Descriptions>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>团队其他成员</strong>} span={3}>
                        {info.成员列表show
                        /* {info.成员列表show && info.成员列表show.map(item => (
                            <Descriptions size='small' column={6} bordered layout='vertical'>
                                <Descriptions.Item label='学号'>{item.Sno}</Descriptions.Item>
                                <Descriptions.Item label='姓名'>{item.sname}</Descriptions.Item>
                                <Descriptions.Item label='学历'>{item.学历层次}</Descriptions.Item>
                                <Descriptions.Item label='学院'>{item.DepartmentName}</Descriptions.Item>
                                <Descriptions.Item label='班级'>{item.className}</Descriptions.Item>
                                <Descriptions.Item label='联系方式'>{item.联系方式}</Descriptions.Item>
                            </Descriptions>
                        ))} */}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>第一指导教师</strong>} span={3}>
                        <Descriptions size='small' column={3} bordered layout='vertical'>
                            <Descriptions.Item label='工号'>{info.第一指导教师 && info.第一指导教师.split(':')[1]}</Descriptions.Item>
                            <Descriptions.Item label='姓名'>{info.tname}</Descriptions.Item>
                            <Descriptions.Item label='单位'>{info.Tdepartment}</Descriptions.Item>
                            {/* <Descriptions.Item label='身份证号'>{info.tsfzh}</Descriptions.Item> */}
                        </Descriptions>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>其他指导教师</strong>} span={3}>
                        {info.其他指导教师show
                        /* {info.其他指导教师show && info.其他指导教师show.map(item => (
                            <Descriptions size='small' column={4} bordered layout='vertical'>
                                <Descriptions.Item label='工号'>{info.tno}</Descriptions.Item>
                                <Descriptions.Item label='姓名'>{info.sname}</Descriptions.Item>
                                <Descriptions.Item label='单位'>{info.tDepartmentName}</Descriptions.Item>
                                <Descriptions.Item label='身份证号'>{info.tsfzh}</Descriptions.Item>
                            </Descriptions>
                        ))} */}
                    </Descriptions.Item>
                    
                    <Descriptions.Item label={<strong>获奖证书</strong>} span={3}>
                        {info.rewardAppendix && <AppendixList fileList={info.rewardAppendix} />}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>获奖通知</strong>} span={3}>
                        {info.rewardNoticeAppendix && <AppendixList fileList={info.rewardNoticeAppendix} />}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>指导教师证书</strong>} span={3}>
                        {info.supportAppendix && <AppendixList fileList={info.supportAppendix} />}
                    </Descriptions.Item>
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
