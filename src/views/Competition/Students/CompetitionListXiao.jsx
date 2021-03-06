import React from 'react';
import { Table, Button, Space, Input } from 'antd';

import { getCompetitionList } from '../../../services/administer/competition'


class CompititionListXiao extends React.Component {
  state = {
    dataSource: [],
    _total: 0,
    currentPage: 1,
    pageSize: 5,
    loading: false,
    comName: ''
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
  refresh = (currentPage, pageSize) => {
    currentPage = currentPage ? currentPage : this.state.currentPage;
    pageSize = pageSize ? pageSize : this.state.pageSize;

    let params = {
      DepartmentId: '0',
      comName: this.state.comName,
      currentPage,
      pageSize
    }

    getCompetitionList(params).then(res => {
      if (res.result) {
        let list = []
        let data = JSON.parse(res.data)
        //console.log(data)
        data.list.map(item =>
          list.push({
            id: item.id,
            key: item.id,
            name: item.name,
            fromUnit: item.fromUnit,
            status:item.status,
            submitTime: item.submitStart + '至' + item.submitEnd
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
  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const columns = [
      {
        title: '比赛编号',
        dataIndex: 'id',
        key: 'id',
        width: 200,
      },
      {
        title: '比赛名称',
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: '组织单位',
        dataIndex: 'fromUnit',
        key: 'fromUnit',
        width: 200,
      },
      {
        title: '参赛时间',
        dataIndex: 'submitTime',
        key: 'submitTime',
        width: 400,
      },{
        title: '项目状态',
        dataIndex: 'status',
        key: 'status',
        width: 400,
      },  {
        title: '操作',
        key: 'action',
        width: 80,
        render: (text, record) => (
          <Button
            type='primary'
            size='small'
            shape='round'
            onClick={() => {
              this.props.history.push({ pathname: '/student/competition', state: { id: record.id } })
            }}
          >详情</Button>
        ),
      },
    ];
    const { dataSource, pageSize, _total, loading, comName } = this.state;
    return (
      <div>
        <Space style={{ margin: 20 }}>
          <Input addonBefore='比赛名称' name='comName' value={comName} onChange={this.changeValue} />
          <Button type='primary' onClick={this.search}>搜索</Button>
        </Space>
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
          //scroll={{ y: 320 }}
        />
      </div>
    )
  }
}


export default CompititionListXiao