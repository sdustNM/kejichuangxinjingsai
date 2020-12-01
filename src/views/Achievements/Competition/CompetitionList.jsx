import React, { Component } from 'react'
import { Modal, Table, Button } from 'antd'
import { SearchOutlined, CloseSquareFilled } from '@ant-design/icons'
import { getCompetitionList, getCompetitionByID } from '../../../services/Achievements'
import CompetitionInfo from './CompetitionInfo'



class CompetitionList extends Component {
    state = {
        sno: '',
        partName: '',
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

    search = () => {
        this.setState({
            currentPage: 1
        })
        this.refresh(1)
    }

    refresh = async (currentPage, pageSize) => {
        const { sno, partName } = this.state
        this.setState({ loading: true });
        currentPage = currentPage ? currentPage : this.state.currentPage
        pageSize = pageSize ? pageSize : this.state.pageSize
        let params = {
            sno,
            partName,
            currentPage,
            pageSize
        }

        const res = await getCompetitionList(params)
        if (res) {
            console.log(res)
            let list = []
            res.map(item =>
                list.push({
                    key: '竞赛_' + item.id,
                    id: item.id,
                    title: item.竞赛名称show,
                    yearMonth: item.获奖时间year + '.' + item.获奖时间month,
                    head: `${item.sname}(${item.sno})`,
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
        const { loading, dataSource, pageSize, _total, info } = this.state
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
                title: '操作',
                key: 'action',
                render: (text, record) =>
                    <Button
                        type='primary'
                        size='small'
                        shape='round'
                        onClick={() => {
                            this.showInfo(record.id)
                        }}
                    >
                        <SearchOutlined />
                    </Button>
            },
        ];
        return (
            <>
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
            </>
        )
    }
}

export default CompetitionList
