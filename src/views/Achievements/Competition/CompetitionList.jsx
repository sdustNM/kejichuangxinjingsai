import React, { Component } from 'react'
import { Modal, Table, Button, Card, Space, Select, Input } from 'antd'
import { SearchOutlined, CloseSquareFilled, DoubleRightOutlined } from '@ant-design/icons'
import { getCompetitionList, getCompetitionByID } from '../../../services/Achievements'
import CompetitionInfo from './CompetitionInfo'
import { exportCompetition } from '../../../services/Achievements'

const { Option } = Select
const statusList = ['已拒绝', '未提交', '学院审核中', '学校审核中', '审核通过']

class CompetitionList extends Component {
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
        this.setState({ loading: true });
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

        const res = await getCompetitionList(params)
        if (res.result) {
            //console.log(res)
            const data = JSON.parse(res.data)
            console.log(data)
            let list = []
            data.list.map(item =>
                list.push({
                    key: '竞赛_' + item.编号,
                    id: item.编号,
                    title: item.竞赛名称,
                    yearMonth: item.获奖时间,
                    head: item.学生姓名,
                    department: item.学院,
                    class: item.班级,
                    status: statusList[item.State + 1]
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

    showInfo = async id => {
        const res = await getCompetitionByID({ id })
        if (res.result) {
            const info = JSON.parse(res.data)
            console.log(info)
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
                title: '竞赛名称',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '获奖年月',
                dataIndex: 'yearMonth',
                key: 'yearMonth'
            },
            {
                title: '第一负责人',
                dataIndex: 'head',
                key: 'head'
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
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                //fixed: 'right'
            },
            {
                title: '操作',
                key: 'action',
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
                    <span>学院 </span>
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
                    <span>状态 </span>
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
                    <span>竞赛或作品 </span>
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
                    <span>学号 </span>
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
        const extra = <Button type='primary' onClick={()=>exportCompetition({},'学生竞赛成果一览表.xls')}>导出</Button>
        return (
            <Card title={title} extra={extra}>
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
                    }} />
                <Modal
                    //title={<br/>}
                    visible={this.state.visible}
                    closeIcon={<CloseSquareFilled style={{ fontSize: 35 }} />}
                    onCancel={() => this.setState({ visible: false })}
                    width={1000}
                    footer={null}
                >
                    {info && <CompetitionInfo info={info} size='small' />}
                </Modal>
            </Card>
        )
    }
}

export default CompetitionList
