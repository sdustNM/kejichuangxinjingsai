import React, { Component } from 'react'
import { Modal, Table, Button, Card, Space, Select, Input, Popconfirm, message, Alert } from 'antd'
import { SearchOutlined, CloseSquareFilled, DoubleRightOutlined } from '@ant-design/icons'
import { getPatentList, getPatentByID, getPatentBatchList, exportPatent, deletePatentByID } from '../../../services/Achievements/historyAchieve'
import PatentInfo from './PatentInfo'
import { isGod } from '../../../utils/auth'

const { Option } = Select
const statusList = ['已拒绝', '未提交', '学院审核中', '学校审核中', '审核通过']

class PatentList extends Component {
    state = {
        showSearch: this.props.showSearch,
        departmentList: this.props.departmentList,
        departmentNo: this.props.departmentNo,
        sno: '',
        partName: '',
        state: '学校审核通过',
        type: '0',
        currentPage: 1,
        pageSize: 10,
        loading: false,
        visible: false,
        batch: '',
        info: null
    }
    batches = []

    async componentDidMount() {
        const res2 = await getPatentBatchList()
        if (res2.result) {
            this.batches = JSON.parse(res2.data)
        }
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
    handleTypeChange = type => {
        this.setState({ type }, this.search)
    }
    handleBatchChange = batch => {
        this.setState({ batch }, this.search)
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
        const { departmentNo, state, type, sno, partName, batch } = this.state
        currentPage = currentPage ? currentPage : this.state.currentPage
        pageSize = pageSize ? pageSize : this.state.pageSize
        let params = {
            departmentNo,
            state,
            patentType: type,
            sno,
            partName,
            currentPage,
            pageSize,
            batch
        }

        //console.log(params)
        const res = await getPatentList(params)
        if (res.result) {
            //console.log(res)
            const data = JSON.parse(res.data)
            let list = []
            data.list.map(item =>
                list.push({
                    key: '专利_' + item.Id,
                    batch: item.批次,
                    id: item.Id,
                    patentName: item.专利名称,
                    patentNo: item.专利申请号,
                    inventor: item.姓名,
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
        const res = await getPatentByID({ id })
        if (res.result) {
            const info = JSON.parse(res.data)
            //console.log(info)
            this.setState({
                info,
                visible: true
            })
        }
    }
    del = async id => {
        const res = await deletePatentByID({ id })
        if (res.result) {
            Modal.success({
                content: `删除成功！`,
            });
        } else {
            Modal.error({
                content: `删除失败！`,
            });
        }
        this.refresh()
    }

    export = () => {
        this.setState({
            loading: true
        });
        const { departmentNo, state, type, sno, partName, batch } = this.state
        const params = { departmentNo, state, patentType: type, sno, partName, batch }
        exportPatent(params, '学生专利成果一览表.xls').then(() => {
            this.setState({
                loading: false
            });

        })
    }



    render() {
        const { loading, dataSource, pageSize, _total, info, departmentList,
            departmentNo, sno, partName, state, type, showSearch,
            batch, visible } = this.state
        const columns = [
            {
                title: '归档批次',
                dataIndex: 'batch',
                key: 'batch',
                width: 100,
                fixed: 'left',
            },
            {
                title: '成果编号',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '专利名称',
                dataIndex: 'patentName',
                key: 'patentName'
            },
            {
                title: '专利申请号',
                dataIndex: 'patentNo',
                key: 'patentNo'
            },
            {
                title: '第一发明人',
                dataIndex: 'inventor',
                key: 'inventor'
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
                fixed: 'right'
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                render: (text, record) => (
                    <Space>
                        <Button
                            type='link'
                            size='small'
                            onClick={() => {
                                this.showInfo(record.id)
                            }}
                        >
                            <DoubleRightOutlined />详情
                        </Button>
                        {
                            isGod() && (
                                <Popconfirm
                                    title="确认将已存档的成果删除吗?删除后不可恢复，请谨慎操作！"
                                    onConfirm={() => this.del(record.id)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button type='danger' size='small'>彻底删除</Button>
                                </Popconfirm>
                            )
                        }
                    </Space>
                )
            },
        ];
        const title = (
            <Space direction='vertical'>
                <Space>
                    <span>
                        <span>批次 </span>
                        <Select
                            value={batch}
                            style={{ width: 180 }}
                            onChange={this.handleBatchChange}
                        >
                            <Option key='all' value='' >全部</Option>
                            {this.batches.map(
                                item => <Option key={item} value={item} >{item}</Option>)}
                        </Select>
                    </span>
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
                            style={{ width: 150 }}
                            onChange={this.handleStateChange}
                        >
                            <Option key='学校审核通过' value='学校审核通过' >学校审核通过</Option>
                            <Option key='被拒绝' value='被拒绝' >被拒绝</Option>
                            <Option key='全部' value='全部' >全部</Option>
                        </Select>
                    </span>
                    <span>
                        <span>类型 </span>
                        <Select
                            value={type}
                            style={{ width: 150 }}
                            onChange={this.handleTypeChange}
                        >
                            <Option key='0' value='0' >全部</Option>
                            <Option key='发明' value='发明' >发明</Option>
                            <Option key='实用新型' value='实用新型' >实用新型</Option>
                            <Option key='外观设计' value='外观设计' >外观设计</Option>
                        </Select>
                    </span>

                </Space>
                <Space>
                    <span>
                        <span>成果编号或专利名称 </span>
                        <Input
                            allowClear
                            style={{ width: 180 }}
                            //addonBefore=''
                            name='partName'
                            value={partName}
                            onChange={this.changeValue}
                            onPressEnter={this.search}
                            placeholder='模糊匹配'
                        />
                    </span>
                    <span>
                        <span>学号或姓名 </span>
                        <Input
                            allowClear
                            style={{ width: 180 }}
                            //addonBefore='学号'
                            name='sno'
                            value={sno}
                            onChange={this.changeValue}
                            onPressEnter={this.search}
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
            </Space>
        )
        const extra = <Button type='primary' onClick={() => this.export()}>导出</Button>
        return (
            <Card title={showSearch && title} extra={showSearch && extra}>
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
                    visible={visible}
                    closeIcon={<CloseSquareFilled style={{ fontSize: 35 }} />}
                    onCancel={() => this.setState({ visible: false })}
                    width={1200}
                    footer={null}
                >
                    {info && <PatentInfo info={info} size='small' />}
                </Modal>

            </Card>
        )
    }
}

export default PatentList
