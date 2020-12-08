import React, { Component } from 'react'
import { Modal, Table, Button, Card, Space, Select, Input } from 'antd'
import { SearchOutlined, CloseSquareFilled, DoubleRightOutlined } from '@ant-design/icons'
import { getArticleList, getArticleByID } from '../../../services/Achievements'
import ThesisInfo from './ThesisInfo'

const { Option } = Select

export default class ThesisList extends Component {
    state = {
        departmentList: this.props.departmentList,
        departmentNo: '0',
        sno: '',
        partName: '',
        state: '审核通过',
        currentPage: 1,
        pageSize: 10,
        loading: false,
        visible: false,
        info: null
    }

    componentDidMount() {
        this.refresh()
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

    handleDeptChange = value => {
        this.setState({
            departmentNo: value
        }, this.search)
    }
    handleStateChange = value => {
        this.setState({
            state: value
        }, this.search)
    }
    changeValue = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    search = () => {
        this.setState({
            currentPage: 1
        })
        this.refresh(1)
    }

    refresh = async (currentPage, pageSize) => {
        this.setState({ loading: true })
        const { departmentNo, state, sno, partName } = this.state
        currentPage = currentPage ? currentPage : this.state.currentPage
        pageSize = pageSize ? pageSize : this.state.pageSize
        let params = {
            departmentNo,
            state,
            sno,
            partName,
            currentPage,
            pageSize
        }

        console.log(params)
        const res = await getArticleList(params)
        if (res) {
            console.log(res)
            let list = []
            res.map(item =>
                list.push({
                    key: '论文_' + item.id,
                    id: item.id,
                    title: item.论文名称,
                    collection: item.期刊收录,
                    year: item.发表时间year,
                    issue: item.发表期号,
                    author: item.sname,
                    sno: item.sno,
                    department: item.departmentName,
                    class: item.className
                })
            )

            this.setState({
                dataSource: list,
                _total: list.length,
                loading: false
            })
        }
        else {
            this.setState({
                loading: false
            })
        }
    }

    showInfo = async id => {
        const res = await getArticleByID({ id })
        if (res.result) {
            const info = JSON.parse(res.data)
            //console.log(info)
            this.setState({
                info,
                visible: true
            })
        }
    }
    render() {
        const { loading, dataSource, pageSize, _total, info, departmentList, departmentNo, sno, partName, state } = this.state
        const columns = [
            {
                title: '论文题目',
                dataIndex: 'title',
                key: 'title',
                width: 200,
                fixed: 'left',
            },
            {
                title: '第一作者',
                dataIndex: 'author',
                key: 'author',
                fixed: 'left',
            },
            {
                title: '期刊收录',
                dataIndex: 'collection',
                key: 'collection'
            },
            {
                title: '发表年份',
                dataIndex: 'year',
                key: 'year'
            },
            {
                title: '发表期号',
                dataIndex: 'issue',
                key: 'issue'
            },
            {
                title: '作者学号',
                dataIndex: 'sno',
                key: 'sno'
            },
            {
                title: '所在学院',
                dataIndex: 'department',
                key: 'department'
            },
            {
                title: '专业班级',
                dataIndex: 'class',
                key: 'class'
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                render: (text, record) => (
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            this.showInfo(record.id)
                        }}
                    >
                        <DoubleRightOutlined />详情
                    </Button>
                )
            },
        ];
        const title = (
            <Space>
                <span>
                    <span>学院:</span>
                    <Select
                        value={departmentNo}
                        style={{ width: 180 }}
                        onChange={this.handleDeptChange}
                    >
                        {departmentList.map(
                            item => <Option key={'department_' + item.id} value={item.id} >{item.name}</Option>)}
                    </Select>
                </span>
                <span>
                    <span>状态:</span>
                    <Select
                        value={state}
                        style={{ width: 100 }}
                        onChange={this.handleStateChange}
                    >
                        <Option key='审核通过' value='审核通过' >审核通过</Option>
                        <Option key='等待审核' value='等待审核' >等待审核</Option>
                        <Option key='全部' value='全部' >全部</Option>
                    </Select>
                </span>
                <span>
                    <span>题目:</span>
                    <Input
                        allowClear
                        style={{ width: 180 }}
                        //addonBefore=''
                        name='partName'
                        value={partName}
                        onChange={this.changeValue}
                        placeholder='模糊匹配'
                    />
                </span>
                <span>
                    <span>学号:</span>
                    <Input
                        allowClear
                        style={{ width: 180 }}
                        //addonBefore='学号'
                        name='sno'
                        value={sno}
                        onChange={this.changeValue}
                        placeholder='精确匹配'
                    />
                </span>


                <Button
                    type='primary'
                    shape='round'
                    size='small'
                    onClick={this.search}
                >
                    <SearchOutlined />
                </Button>
            </Space>
        )
        const extra = <Button type='primary'>导出</Button>
        return (
            <Card title={title} extra={extra}>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={loading}
                    scroll={{ x: 1200 }}
                    pagination={{
                        pageSize: pageSize,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        showSizeChanger: true,
                        showQuickJumper: true,
                        total: _total,
                        showTotal: (total, range) => `第${range[0]}-${range[1]}条 共${total}条`,
                        onChange: this.pageChange,
                        onShowSizeChange: this.showSizeChange,
                    }} />
                <Modal
                    //title={<br/>}
                    visible={this.state.visible}
                    closeIcon={<CloseSquareFilled style={{ fontSize: 35 }} />}
                    onCancel={() => this.setState({ visible: false })}
                    width={1000}
                    footer={null}
                >
                    {info && <ThesisInfo info={info} size='small' />}
                </Modal>
            </Card>
        )
    }
}
