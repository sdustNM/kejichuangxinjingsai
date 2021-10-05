import React, { Component } from 'react'
import { Card, Table, Button, Collapse, Spin, Alert, Typography, Drawer, Space, Popconfirm, Modal } from 'antd'
import { getRepeatCompetitions, setSchoolReview } from '../../../../../services/Achievements'
import RepeatCompetitionDetail from '../Detail'

const { Panel } = Collapse
const { Title } = Typography

export default class RepeatCompetitionManager extends Component {
    state = {
        dataSource: [],
        id: null,
        loading: false,
        visible: false
    }
    columns = [
        {
            title: '竞赛名称',
            dataIndex: '竞赛名称',
            key: 'name',
        },
        {
            title: '作品名称',
            dataIndex: '作品名称',
            key: 'address',
        },
        {
            title: '姓名',
            dataIndex: 'sname',
            key: 'sname',
        },
        {
            title: '指导教师',
            dataIndex: 'tname',
            key: 'tname',
        },
        {
            title: '其他成员',
            dataIndex: '成员',
            key: '成员',
        },
        {
            title: '审核状态',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Button type='primary' onClick={() => this.check(record.id)}>审核</Button>
            ),
        },
    ];

    refresh = async () => {
        this.setState({ loading: true })
        const res = await getRepeatCompetitions()
        if (res.result) {
            const data = JSON.parse(res.data)
            let group = 0
            let name = ''
            let list = []
            let dataSource = []
            data.forEach(item => {
                if (item.group != group) {
                    if (list.length > 0) {
                        dataSource.push({ group, name, list })
                        list = []
                    }
                    group = item.group;
                    name = item.竞赛名称
                }
                list.push(item)
            });
            this.setState({ dataSource })
        }
        this.setState({ loading: false })
    }
    async componentDidMount() {
        this.refresh();
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }

    check = async id => {

        this.setState({ id, visible: true })
    }

    onClose = () => {
        this.setState({ visible: false })
    }

    refuse = async () => {
        const { id, dataSource } = this.state
        const params = {
            id,
            type: '竞赛',
            result: -1,
            remark: "重复填报"
        }
        console.log(params)
        const res = await setSchoolReview(params)
        if (res.result) {
            Modal.success({
                content: '操作成功！',
            });
            let newSource = []
            dataSource.map(data => {
                newSource.push({ ...data, list: data.list.filter(x => x.id != id) })
            })
            this.setState({ dataSource: newSource.filter(x => x.list.length > 1) })
        }
        else {
            Modal.error({
                title: '错误提示',
                content: res.message,
            });
        }
        this.onClose();
    }

    render() {
        const { dataSource, loading, visible, id } = this.state
        return <>
            <Card title={<Title>重复检测</Title>}>
                {loading ? (<Spin size='large' tip="加载中...">
                    <Alert
                        message="重复检测"
                        description="系统后台正在检测所有重复提报的竞赛......"
                        type="info"
                    />
                </Spin>) : (
                    <Collapse accordion={true}>
                        {dataSource.map(data =>
                            <Panel header={<span>重复竞赛名称：<strong style={{ color: 'orange' }}>{data.name}</strong></span>} key={data.group}>
                                <Table
                                    rowKey={r => r.id}
                                    dataSource={data.list}
                                    columns={this.columns}
                                    pagination={false}
                                />
                            </Panel>
                        )}
                    </Collapse>)
                }
            </Card>
            <Drawer
                title="重复竞赛详情查看"
                placement='right'
                width={960}
                onClose={this.onClose}
                visible={visible}
                destroyOnClose={true}
            >
                <Space style={{ align: 'right' }}>
                    <Popconfirm
                        title="您确认这是一条重复申请的记录，并将其拒绝吗?"
                        onConfirm={this.refuse}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button type='danger'>拒绝</Button>
                    </Popconfirm>
                    <Button onClick={this.onClose}>取消</Button>
                </Space>
                <RepeatCompetitionDetail competitionID={id} />
            </Drawer>
        </>

    }
}
