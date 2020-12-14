import React, { Component } from 'react'
import { Card, Table, Button, Space, Select, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { getNeedReviewList } from '../../../services/Achievements'
import { getDeptID } from '../../../utils/auth'
import getDepartmentList from '../../../redux/common'

const { Option } = Select

export default class AchievementList extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            departmentList: [],
            departmentNo: getDeptID(),
            achieve: '',
            student: '',
            dataSource: null,
            currentPage: 1,
            pageSize: 10,
            loading: false,
            _total: 0,
        }
        this.statusList = ['退回修改', '学院审核中', '学校审核中']
    }

    async componentDidMount() {
        const res = await getDepartmentList()
        if (res) {
            let departmentList = JSON.parse(res)
            if (this.state.departmentNo != 0) {
                departmentList = departmentList.filter(item => item.id == this.state.departmentNo)
            }
            console.log(getDeptID(), departmentList)
            if (departmentList.length !== 0) {
                this.setState({ departmentList }, this.refresh)
            }
        }

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

    handleDeptChange = value => {
        this.setState({
            departmentNo: value
        }, this.search)
    }

    searchange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    refresh = async (currentPage, pageSize) => {
        this.setState({ loading: true });
        const { departmentNo, achieve, student } = this.state
        currentPage = currentPage ? currentPage : this.state.currentPage
        pageSize = pageSize ? pageSize : this.state.pageSize
        let params = {
            currentPage,
            pageSize,
            departmentNo,
            achieve,
            student
        }
        console.log(params)
        const res = await getNeedReviewList(params)
        //console.log(res)
        if (res.result) {
            let list = []
            let data = JSON.parse(res.data)
            //console.log(data)
            data.list.map(item =>
                list.push({
                    key: item.type + '_' + item.id,
                    ID: item.id,
                    name: item.achievementName,
                    sname: item.sname,
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
        const { dataSource, loading, pageSize, _total, departmentList, departmentNo, achieve, student } = this.state
        const columns = [
            {
                title: '成果类别',
                dataIndex: 'type',
                key: 'type'
            },
            {
                title: '成果编号',
                dataIndex: 'ID',
                key: 'ID'
            },
            {
                title: '成果名称',
                dataIndex: 'name',
                key: 'name'
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
        ]
        const title = (
            <Space size='middle'>
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
                    <span>成果信息 </span>
                    <Input
                        allowClear
                        style={{ width: 200 }}
                        //addonBefore=''
                        name='achieve'
                        value={achieve}
                        onChange={this.searchange}
                        placeholder='请输入成果编号或名称'
                    />
                </span>
                <span>
                    <span>学生信息 </span>
                    <Input
                        allowClear
                        style={{ width: 200 }}
                        //addonBefore='学号'
                        name='student'
                        value={student}
                        onChange={this.searchange}
                        placeholder='请输入学生学号或姓名'
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
        return (
            <Card title={title}>
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
