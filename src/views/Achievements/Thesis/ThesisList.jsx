import React, { Component } from 'react'
import { Modal, Table, Button, Card, Space, Select, Input, Popconfirm, message, Alert } from 'antd'
import { SearchOutlined, CloseSquareFilled, DoubleRightOutlined } from '@ant-design/icons'
import { getArticleList, getArticleByID, getArticleDDInfo, fileArticle } from '../../../services/Achievements'
import ThesisInfo from './ThesisInfo'
import { exportArticle, setSchoolReview } from '../../../services/Achievements'
import { isGod } from '../../../utils/auth'
const { Option } = Select

const statusList = ['已拒绝', '未提交', '学院审核中', '学校审核中', '审核通过']
export default class ThesisList extends Component {
    state = {
        showSearch: this.props.showSearch,
        departmentList: this.props.departmentList,
        departmentNo: this.props.departmentNo,
        sno: '',
        partName: '',
        state: '学校审核通过',
        collection: '0',
        currentPage: 1,
        pageSize: 10,
        loading: false,
        visible: false,
        fileVisible: false,
        batch: '',
        info: null
    }
    collections = []

    async componentDidMount() {

        const res = await getArticleDDInfo()
        if (res.result) {
            this.collections = JSON.parse(res.data).ddType
        }
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
    handleCollectionChange = collection => {
        this.setState({ collection }, this.search)
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
        const { departmentNo, state, collection, sno, partName } = this.state
        currentPage = currentPage ? currentPage : this.state.currentPage
        pageSize = pageSize ? pageSize : this.state.pageSize
        let params = {
            departmentNo,
            state,
            indexType: collection,
            sno,
            partName,
            currentPage,
            pageSize
        }

        //console.log(params)
        const res = await getArticleList(params)
        if (res.result) {
            //console.log(res)
            const data = JSON.parse(res.data)
            //console.log(data)
            let list = []
            data.list.map(item =>
                list.push({
                    key: '论文_' + item.Id,
                    id: item.Id,
                    title: item.论文名称,
                    collection: item.期刊收录,
                    year: item.发表时间year,
                    issue: item.发表期号,
                    author: item.姓名,
                    sno: item.学号,
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

    changeState = async id => {
        const params = {
            id,
            type: '论文',
            result: 99,
            remark: '管理员修改状态'
        }
        console.log(params)
        let res = await setSchoolReview(params)
        if (res.result) {
            message.success('操作成功！')
        }
        this.refresh()
    }


    export = () => {
        this.setState({
            loading: true
        });
        const { departmentNo, state, collection, sno, partName } = this.state
        const params = { departmentNo, state, indexType: collection, sno, partName }
        exportArticle(params, '学生论文成果一览表.xls').then(() => {
            this.setState({
                loading: false
            });

        })
    }

    handleFile = async () => {

        const batchName = this.state.batch.trim()
        //alert(this.state.batch)
        if (batchName === '') {
            Modal.error({
                content: `请输入正确的批次名称！`,
            });
            return
        }

        const res = await fileArticle({ batchId: batchName })
        if (res.result) {
            Modal.success({
                content: `批次【${this.state.batch}】归档成功，可在历史成果中进行查看！`,
            });
            this.refresh()
        }
        else {
            Modal.error({
                content: `批次【${this.state.batch}】归档失败！`,
            });
        }

        this.fileModalClose()

    }

    fileModalClose = () => {
        this.setState({
            batch: '',
            fileVisible: false
        })
    }

    render() {
        const {
            loading, dataSource, pageSize, _total,
            info, departmentList, departmentNo, sno, partName,
            state, collection, showSearch, batch, visible, fileVisible
        } = this.state
        const columns = [
            {
                title: '成果编号',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                fixed: 'left',
            },
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
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                fixed: 'right'
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 180,
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
                                    title="确认将成果状态改为【学校待审】吗?"
                                    onConfirm={() => this.changeState(record.id)}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button type='danger' size='small'>恢复待审</Button>
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
                            <Option key='等待学校审核' value='等待学校审核' >等待学校审核</Option>
                            <Option key='等待学院审核' value='等待学院审核' >等待学院审核</Option>
                            <Option key='被拒绝' value='被拒绝' >被拒绝</Option>
                            <Option key='全部' value='全部' >全部</Option>
                        </Select>
                    </span>
                    <span>
                        <span>收录 </span>
                        <Select
                            value={collection}
                            style={{ width: 150 }}
                            onChange={this.handleCollectionChange}
                        >
                            <Option key='all' value='0' >全部</Option>
                            {
                                this.collections.map(collection => <Option key={collection.Id} value={collection.Name} >{collection.Name}</Option>)
                            }
                        </Select>
                    </span>
                </Space>
                <Space>
                    <span>
                        <span>编号或题目 </span>
                        <Input
                            allowClear
                            style={{ width: 180 }}
                            //addonBefore=''
                            name='partName'
                            value={partName}
                            onChange={this.changeValue}
                            onPressEnter={this.search}
                            placeholder=''
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
        const extra = (
            <Space>
                <Button type='primary' onClick={() => this.export()}>导出</Button>
                {isGod() && <Button type='danger' onClick={() => this.setState({ fileVisible: true })}>归档</Button>}
            </Space>)
        return (
            <Card title={showSearch && title} extra={showSearch && extra}>
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
                    visible={visible}
                    closeIcon={<CloseSquareFilled style={{ fontSize: 35 }} />}
                    onCancel={() => this.setState({ visible: false })}
                    width={1200}
                    footer={null}
                >
                    {info && <ThesisInfo info={info} size='small' />}
                </Modal>
                <Modal
                    title='归档确认'
                    closeIcon={null}
                    visible={fileVisible}
                    onOk={this.handleFile}
                    onCancel={this.fileModalClose}
                    maskClosable={false}
                >
                    <Space direction='vertical'>
                        <Input
                            placeholder="请输入归档批次"
                            name='batch'
                            value={batch}
                            onChange={this.changeValue} />
                        <Alert
                            message="注意"
                            description="按照批次归档后，当前已审核成果将成为历史数据，请谨慎操作！"
                            type="warning"
                            showIcon
                        />
                    </Space>
                </Modal>
            </Card >
        )
    }
}
