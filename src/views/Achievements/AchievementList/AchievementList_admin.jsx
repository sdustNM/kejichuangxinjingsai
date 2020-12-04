import React, { Component } from 'react'
import { Card, Table, Button, Space } from 'antd'
import { getNeedReviewList } from '../../../services/Achievements'
export default class AchievementList extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            dataSource: null,
            currentPage: 1,
            pageSize: 5,
            loading: false,
            _total: 0,
        }
        this.statusList = ['退回修改', '学院审核中', '学校审核中']
    }

    componentDidMount() {
        this.refresh();
    }

    pageChange = (currentPage, pageSize) => {
        this.setState({
            currentPage,
            pageSize
        })
        this.refresh(currentPage, pageSize);
    }
    showSizeChange = (current, pageSize) => {

        this.setState({
            currentPage: 1,
            pageSize
        })
        this.refresh(1, pageSize);
    }

    search = () => {
        this.setState({
            currentPage: 1
        })
        this.refresh(1)
    }

    refresh = async (currentPage, pageSize) => {
        this.setState({ loading: true });
        currentPage = currentPage ? currentPage : this.state.currentPage
        pageSize = pageSize ? pageSize : this.state.pageSize
        let params = {
            currentPage,
            pageSize
        }
        //console.log(params)
        const res = await getNeedReviewList(params)
        //console.log(res)
        if (res.result) {
            let list = []
            let data = JSON.parse(res.data)
            console.log(data)
            data.list.map(item =>
                list.push({
                    key: item.type + '_' + item.id,
                    ID: item.id,
                    name: item.achievementName,
                    sname:item.sname,
                    dept: item.departmentName,
                    type: item.type,
                    state: item.state,
                    status: this.statusList[item.state]
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
                title: '姓名',
                dataIndex: 'sname',
                key: 'sname'
            },
            {
                title: '学院',
                dataIndex: 'dept',
                key: 'dept'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Space>
                        <Button
                            type='primary'
                            size='small'
                            shape='round'
                            onClick={() => {
                                //console.log("record.name:", record.name)
                                this.props.history.push({ pathname: '/administer/achievementsInfo', state: { id: record.ID, type: record.type } })
                            }}
                        >查看</Button>
                    </Space>
                ),
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
                        pageSizeOptions: ['5', '10', '20', '50'],
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
