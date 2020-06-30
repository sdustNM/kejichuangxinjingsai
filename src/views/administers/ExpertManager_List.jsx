import React from 'react'

import { Table, Space, Button, Row } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { getExpertList } from '../../services/DataManager'
import { getDeptID } from '../../utils/auth'




class ExpertManager_List extends React.Component {
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
    getExpertList({
      id: deptID,
      currentPage,
      pageSize
    }).then(res => {
      //console.log(res)
      if (res.data.result) {
        let list = []
        let data = JSON.parse(res.data.data)
        data.list.map(item =>
          list.push({
            id: item.id,
            key: item.id,
            name: item.name,
            fromUnit: item.fromUnit,
            category: item.category,
            state: '待定'
          })
        )
        console.log(data)
        this.setState({
          dataSource: list,
          _total: data.totalNum
        })
      }

    })

  }

  render() {
    const columns = [
      {
        title: '专家ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '专家姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '身份证号',
        dataIndex: 'sfzh',
        key: 'sfzh',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: '工作单位',
        key: 'unit',
        dataIndex: 'unit',
      },
      {
        title: '办公电话',
        key: 'Tel1',
        dataIndex: 'Tel1',
      },
      {
        title: '移动电话',
        key: 'Tel2',
        dataIndex: 'Tel2',
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
            <Button type="primary"
              onClick={() => this.ResetPwd()}>
              重置密码 </Button>
          </Space>
        ),
      },
    ];
    const { dataSource, pageSize, _total, loading } = this.state;
    return (
      <div>
        <Row> </Row>
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
            showTotal: (total, range) => `第${range[0]}-${range[1]}条 共${total}条`,
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

export default ExpertManager_List


