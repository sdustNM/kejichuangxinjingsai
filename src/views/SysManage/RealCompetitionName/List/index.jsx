import React, { Component } from 'react'
import { Card, Table, Space, Button, Input, Modal, Popconfirm, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { getRealNameList, deleteRealName } from '../../../../services/Achievements/competitionName'
import RealCompetitionEdit from '../Edit';

export default class RealCompetitionManager extends Component {
    state = {
        id: '',             //比赛ID
        name: '',           //比赛名称关键字
        dataSource: [],     //比赛列表
        currentPage: 1,     //当前页
        pageSize: 10,       //每页显示数量
        loading: false,     //数据加载中
        _total: 0,          //列表数据数量
        visible: false,     //编辑框显示    
        record: {},         //当前编辑比赛记录
    }

    componentDidMount() {
        this.refresh()
    }
    //根据关键字搜索
    search = () => {
        this.setState({ currentPage: 1 }, this.refresh)
    }
    //重新获取数据
    refresh = async () => {
        const { id, name, currentPage, pageSize } = this.state
        const params = { id, name, currentPage, pageSize }
        const res = await getRealNameList(params)
        if (res.result) {
            const data = JSON.parse(res.data)
            console.log(data)
            this.setState({
                dataSource: data.list,
                _total: data.totalNum
            })
        }
    }
    //搜索框内容更改
    changeValue = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    //清空搜索框
    reset = () => {
        this.setState({
            id: '',
            name: ''
        })
    }
    //指定页码跳转
    pageChange = (currentPage, pageSize) => {
        this.setState({
            currentPage,
            pageSize
        }, this.refresh)

    }
    //每页显示记录条数改变
    showSizeChange = (_, pageSize) => {
        this.setState({
            currentPage: 1,
            pageSize
        }, this.refresh)
    }
    //删除指定记录
    del = async id => {
        const res = await deleteRealName({ id })
        if (res.result) {
            message.success('删除成功！', 1)
            this.refresh()
        } else {
            message.error(res.message, 1)
        }
    }
    //编辑（添加、修改）指定记录
    edit = record => {
        this.setState({
            visible: true,
            record
        })
    }
    //关闭编辑模态框
    hideModal = () => {
        this.setState({ visible: false }, this.refresh)
    }

    render() {
        const { id, name, dataSource, pageSize, _total, loading, visible, record } = this.state;
        const columns = [
            {
                title: '编号',
                dataIndex: 'Id',
                key: 'Id'
            },
            {
                title: '名称',
                dataIndex: 'Name',
                key: 'Name'
            },
            {
                title: '类型',
                dataIndex: 'Type',
                key: 'Type',
            },
            {
                title: '级别',
                dataIndex: 'ComLevel',
                key: 'ComLevel',
            },
            {
                title: '年份',
                dataIndex: 'Batch',
                key: 'Batch',
            },
            {
                title: '届数',
                dataIndex: 'SessionNumber',
                key: 'SessionNumber',
            },
            {
                title: '排序',
                dataIndex: 'Sortid',
                key: 'Sortid',
            },
            {
                title: '操作',
                key: 'action',
                render: (_, record) => (
                    <Space>
                        <Button
                            type='primary'
                            size='small'
                            shape='round'
                            onClick={() => {
                                this.edit(record)
                            }}
                        >编辑</Button>
                        <Popconfirm
                            title={`确认将固定竞赛【${record.Name}】删除吗?`}
                            onConfirm={() => { this.del(record.Id) }}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button
                                type='danger'
                                size='small'
                                shape='round'
                            >
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];
        const title =
            <Space>
                {/* <Button type='primary' ghost onClick={() => this.edit({})}><PlusCircleOutlined />添加</Button> */}
                <Input addonBefore='编号' name='id' onPressEnter={this.search} value={id} onChange={this.changeValue} />
                <Input addonBefore='名称' name='name' onPressEnter={this.search} value={name} onChange={this.changeValue} />
                <Button type='primary' onClick={this.search}>搜索</Button>
                <Button type='primary' onClick={this.reset}>重置</Button>
            </Space>

        const pagination = {
            pageSize: pageSize,
            pageSizeOptions: ['5', '10', '20', '50'],
            showSizeChanger: true,
            showQuickJumper: true,
            total: _total,
            showTotal: (total, range) => `第${range[0]}-${range[1]}条 共${total}条`,
            onChange: this.pageChange,
            onShowSizeChange: this.showSizeChange,
        }
        return (
            <Card title={title}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    loading={loading}
                    rowKey={record => record.Id}
                />
                <Modal
                    width={640}
                    title='修改比赛信息'
                    visible={visible}
                    onCancel={this.hideModal}
                    //destroyOnClose={true}
                    footer={null}
                >
                    <RealCompetitionEdit record={record} hideModal={this.hideModal}></RealCompetitionEdit>
                </Modal>

            </Card>
        )


    }
}
