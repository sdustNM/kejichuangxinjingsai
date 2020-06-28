import React from 'react';
import { Table, Space, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { getCompetitionList } from '../../services/adminCompetition'
import { getDeptID } from '../../utils/auth'



class CompetitionManagerXiao extends React.Component {

  state = {
    dataSource: [],
    currentPage: 1,
    pageSize: 5,
    loading: false,
    _total: 0
  }

  componentDidMount() {
    this.refresh(this.state.currentPage, this.state.pageSize);
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
      current: 1,
      pageSize
    })
    this.refresh(1, pageSize);
  }

  refresh = (currentPage, pageSize) => {
    let deptID = getDeptID()
    getCompetitionList({
      id: deptID,
      currentPage,
      pageSize
    }).then(res => {
      console.log(res)
      if (res.data.result) {
        let data = []
        JSON.parse(res.data.data).list.map(item =>
          data.push({
            id: item.id,
            key: item.id,
            name: item.name,
            department: item.department,
            category: item.category,
            state: '待定'
          })
        )
        this.setState({
          dataSource: data
        })
      }

    })

  }

  render() {
    const columns = [
      {
        title: '比赛编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '比赛名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '组织单位',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '比赛类型',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: '比赛状态',
        key: 'state',
        dataIndex: 'state',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button
              type='primary'
              size='small'
              shape='round'
              onClick={() => {
                this.props.history.push({ pathname: '/administer/competitionEdit', state: { id: record.id } })
              }}
            >修改</Button>
            <Button
              type='danger'
              size='small'
              shape='round'
            >删除</Button>
          </Space>
        ),
      },
    ];
    const { dataSource, pageSize, total, loading } = this.state;
    return (
      <div>
        <Button
          type='dashed'
          style={{ margin: 20 }}
          onClick={() => { this.props.history.push({ pathname: '/administer/competitionEdit' }) }}
        >
          <PlusCircleOutlined />添加
        </Button>

        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: pageSize,
            pageSizeOptions: ['5', '10', '20', '50'],
            showSizeChanger: true,
            showQuickJumper: true,
            total: _total,
            showTotal: {(total, range) => `${range[0]}-${range[1]} of ${total} items`},
            onChange: this.pageChange,
            onShowSizeChange: this.showSizeChange,
          }}
          loading={loading}
          scroll={{ y: 320 }}
        />
      </div>
    )
  }
}

export default CompetitionManagerXiao;