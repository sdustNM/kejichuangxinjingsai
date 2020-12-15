import React, { Component } from 'react'
import { Card, Descriptions } from 'antd'
import AppendixList from '../AppendixList'

class PatentInfo extends Component {
    render() {

        const info = this.props.info
        return (
            <Card>
                <Descriptions
                    bordered
                    size={this.props.size}
                    column={3}
                    title='专利成果详细信息'
                >
                    <Descriptions.Item label={<strong>专利名称</strong>}>{info.专利名称}</Descriptions.Item>
                    <Descriptions.Item label={<strong>专利申请号</strong>}>{info.专利申请号}</Descriptions.Item>
                    <Descriptions.Item label={<strong>专利形式</strong>}>{info.专利类型}</Descriptions.Item>
                    <Descriptions.Item label={<strong>专利权人</strong>}>{info.专利权人}</Descriptions.Item>
                    <Descriptions.Item label={<strong>申请日期</strong>}>{info.申请时间.substr(0,10)}</Descriptions.Item>
                    <Descriptions.Item label={<strong>授权公告日期</strong>}>{info.授权公告日期.substr(0,10)}</Descriptions.Item>
                    <Descriptions.Item label={<strong>第一发明人</strong>} span={3}>
                        <Descriptions size='small' column={6} bordered layout='vertical'>
                            <Descriptions.Item label='学生学号'>{info.学号}</Descriptions.Item>
                            <Descriptions.Item label='学生姓名'>{info.姓名}</Descriptions.Item>
                            <Descriptions.Item label='学历层次'>{info.学历层次}</Descriptions.Item>
                            <Descriptions.Item label='所在学院'>{info.学院}</Descriptions.Item>
                            <Descriptions.Item label='专业班级'>{info.班级}</Descriptions.Item>
                            <Descriptions.Item label='联系方式'>{info.联系方式}</Descriptions.Item>
                            {
                                info.专利形式 === '发明' && (
                                    <>
                                        <Descriptions.Item label='身份证号'>{info.身份证号}</Descriptions.Item>
                                        <Descriptions.Item label='银行卡号'>{info.银行卡号}</Descriptions.Item>
                                        <Descriptions.Item label='开户行'>{info.开户行}</Descriptions.Item>
                                    </>
                                )
                            }
                        </Descriptions>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>其他发明人</strong>} span={3}>{info.其他发明人 || '无'}</Descriptions.Item>
                    <Descriptions.Item label={<strong>专利证书照片</strong>} span={3}>
                        {info.paperAppendix && <AppendixList fileList={info.paperAppendix} />}
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

export default PatentInfo
