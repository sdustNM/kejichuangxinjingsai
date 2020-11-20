import React, { Component } from 'react'
import { Card, Descriptions } from 'antd'
import AppendixList from '../AppendixList'

class ThesisInfo extends Component {
    render() {
        
        const info = this.props.info
        console.log(info.State)
        const othersNum = info.其它作者.split(',').filter(item => item.trim() !== '').length
        return (
            <Card>
                <Descriptions
                    bordered
                    size='middle'
                    column={3}
                    title='论文成果审核信息'
                >
                    <Descriptions.Item label={<strong>论文名称</strong>} span={2}>{info.论文名称}</Descriptions.Item>
                    <Descriptions.Item label={<strong>发表时间</strong>}>{info.发表时间year}</Descriptions.Item>
                    <Descriptions.Item label={<strong>发表期刊</strong>}>{info.发表期刊}</Descriptions.Item>
                    <Descriptions.Item label={<strong>发表期号</strong>}>{info.发表期号}</Descriptions.Item>
                    <Descriptions.Item label={<strong>期刊收录</strong>}>{info.期刊收录}</Descriptions.Item>
                    <Descriptions.Item label={<strong>第一作者</strong>} span={3}>
                        <Descriptions size='small' column={4} bordered layout='vertical'>
                            <Descriptions.Item label='姓名'>{info.Sno}</Descriptions.Item>
                            <Descriptions.Item label='联系方式'>{info.联系方式}</Descriptions.Item>
                            <Descriptions.Item label='学院'>{'能源与矿业工程学院'}</Descriptions.Item>
                            <Descriptions.Item label='班级'>{'采矿2020-1'}</Descriptions.Item>
                        </Descriptions>
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>作者人数</strong>}>{othersNum + 1}</Descriptions.Item>
                    <Descriptions.Item label={<strong>其他作者</strong>} span={2}>{othersNum ? info.其它作者 : '无'}</Descriptions.Item>
                    <Descriptions.Item label={<strong>期刊封面</strong>} span={3}>
                        {info.coverAppendix && <AppendixList fileList={info.coverAppendix} />}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>目录页</strong>} span={3}>
                        {info.contentsAppendix && <AppendixList fileList={info.contentsAppendix} />}
                    </Descriptions.Item>
                    <Descriptions.Item label={<strong>期刊封面</strong>} span={3}>
                        {info.articleAppendix && <AppendixList fileList={info.articleAppendix} />}
                    </Descriptions.Item>
                    {info.State >= 2 && <Descriptions.Item label={<strong>审核结果</strong>} span={3}>
                        <Descriptions size='small' column={3} bordered >
                            <Descriptions.Item label='学院意见' span={3}>{info.学院意见}</Descriptions.Item>
                            {info.State >= 3 && <Descriptions.Item label='学校意见' span={3}>{info.学校意见}</Descriptions.Item>}
                        </Descriptions>
                    </Descriptions.Item>}
                </Descriptions>

            </Card>
        )
    }
}

export default ThesisInfo
