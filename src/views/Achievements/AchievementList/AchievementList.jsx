import React, { Component } from 'react'
import { Card, Table, Button, Space, message } from 'antd'
import { deleteArticleByID, getNeedReviewList, deleteCompetitionByID, deletePatentByID, deleteOthersByID } from '../../../services/Achievements'
export default class AchievementList extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            dataSource: null,
            currentPage: 1,
            pageSize: 10,
            loading: false,
            _total: 0,
        }
        this.statusList = ['拒绝', '修改', '学院审核中', '学校审核中']
    }

    componentDidMount() {
        this.refresh();
    }

    pageChange = (currentPage, pageSize) => {
        this.setState({
            currentPage,
            pageSize
        }, this.refresh)

    }
    showSizeChange = (current, pageSize) => {

        this.setState({
            currentPage: 1,
            pageSize
        }, this.refresh)

    }

    search = () => {
        this.setState({
            currentPage: 1
        }, this.refresh)

    }

    refresh = async () => {
        this.setState({ loading: true });
        const { currentPage, pageSize } = this.state
        const params = { currentPage, pageSize }
        //console.log(params)
        const res = await getNeedReviewList(params)
        //console.log(res)
        if (res.result) {
            let list = []
            const data = JSON.parse(res.data)
            //console.log(data)
            data.list.map(item =>
                list.push({
                    key: item.type + '_' + item.id,
                    ID: item.id,
                    name: item.achievementName,
                    type: item.type,
                    state: item.state,
                    status: this.statusList[item.state + 1]
                })
            )

            this.setState({
                dataSource: list,
                _total: data.totalNum,
                loading: false
            })
        }
        else {
            this.setState({
                loading: false
            })
        }
    }

    del = async (id, type) => {
        let res
        switch (type) {
            case '论文':
                res = await deleteArticleByID({ id })
                break;
            case '竞赛':
                res = await deleteCompetitionByID({ id })
                break;
            case '专利':
                res = await deletePatentByID({ id })
                break;
                case '其他成果':
                res = await deleteOthersByID({ id })
                break;
            default:
                break;
        }
        if (res.result) {
            message.success('操作成功！')
            this.refresh()
        }
    }
    render() {
        const { dataSource, loading, pageSize, _total } = this.state
        const columns = [
            {
                title: '成果名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '成果类别',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: '状态',
                //dataIndex: 'status',
                key: 'status',
                render: (text, record) =>
                    <span style={record.state < 1 ? { color: 'red' } : {}}>{record.status}</span>
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) =>
                    record.state === 0 ? (
                        <Space>
                            <Button
                                type='primary'
                                size='small'
                                shape='round'
                                onClick={() => {
                                    let pathname
                                    switch (record.type) {
                                        case '论文':
                                            pathname = '/student/thesisForm'
                                            break;
                                        case '竞赛':
                                            pathname = '/student/competitionForm'
                                            break;
                                        case '专利':
                                            pathname = '/student/patentForm'
                                            break;
                                        case '其他成果':
                                            pathname = '/student/OthersForm'
                                            break;
                                        default:
                                            break;
                                    }
                                    this.props.history.push({ pathname, state: { id: record.ID } })
                                }}
                            >修改</Button>
                            <Button
                                type='danger'
                                size='small'
                                shape='round'
                                onClick={() => {
                                    this.del(record.ID, record.type)
                                }}
                            >删除</Button>
                        </Space>) : (
                        <Space>
                            <Button
                                type='primary'
                                size='small'
                                shape='round'
                                onClick={() => {
                                    //console.log("record.name:", record.name)
                                    this.props.history.push({ pathname: '/student/achievementsInfo', state: { id: record.ID, type: record.type } })
                                }}
                            >查看</Button>
                        </Space>
                    )

                ,
            },
        ];
        return (
            <Card>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                    pagination={{
                        pageSize: pageSize,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        showSizeChanger: true,
                        showQuickJumper: true,
                        total: _total,
                        showTotal: (total, range) => `第${range[0]}-${range[1]}条 共${total}条`,
                        onChange: this.pageChange,
                        onShowSizeChange: this.showSizeChange,
                    }}
                />
            </Card>
        )
    }
}
