import React from 'react';
import { Table, Button } from 'antd';

import { getCompetitionList } from '../../../services/administer/competition'
import { getDeptID } from '../../../utils/auth'


class CompititionListYuan extends React.Component {
  state = {
    dataSource: [],
    _total: 0,
    currentPage: 1,
    pageSize: 5,
    loading: false
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
    console.log(deptID)
    getCompetitionList({
      id: deptID,
      currentPage,
      pageSize
    }).then(res => {
      //console.log(res)
      if (res.data.result) {
        let list = []
        let data = JSON.parse(res.data.data)
        //console.log(data)
        data.list.map(item =>
          list.push({
            id: item.id,
            key: item.id,
            name: item.name,
            fromUnit: item.fromUnit,
            category: item.category,
            submitTime: item.submitStart + '至' +item.submitEnd
          })
        )
        //console.log(data)
        this.setState({
          dataSource: list,
          _total: data.totalNum
        })
      }

    })
  }

  render() {
    const columns = [
      // {
      //   title: '比赛编号',
      //   dataIndex: 'id',
      //   key: 'id'
      // }, 
      {
        title: '比赛名称',
        dataIndex: 'name',
        key: 'name',
        width: 150
      }, {
        title: '比赛类型',
        dataIndex: 'category',
        key: 'category',
        width: 100
      }, {
        title: '组织单位',
        dataIndex: 'fromUnit',
        key: 'fromUnit',
        width: 150
      }, {
        title: '参赛时间',
        dataIndex: 'submitTime',
        key: 'submitTime',
        width: 200
      }, {
        title: '操作',
        key: 'action',
        width: 150,
        render: (text, record) => (
          <Button
            type='primary'
            size='small'
            shape='round'
            onClick={() => {
              this.props.history.push({ pathname: '/student/competition', state: { id: record.key } })
            }}
          >详情</Button>
        ),
      },
    ];
    const { dataSource, pageSize, _total, loading } = this.state;
    return (
      <div>
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


export default CompititionListYuan;