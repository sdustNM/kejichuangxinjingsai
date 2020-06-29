import React from 'react'
import { Table, Space, Button, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { getExpertFuzzy } from '../../services/administer/Expert'

class ExpertManager extends React.Component {
  state = {
    id: '',
    name: '',
    sfzh: '',
    dataSource: [],
    departmentList: [],
    currentPage: 1,
    pageSize: 5,
    loading: false,
    _total: 0
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    const { id, name, sfzh, currentPage, pageSize } = this.state
    console.log(this.state)
    getExpertFuzzy({
      id,
      name,
      sfzh,
      currentPage,
      pageSize
    }).then(res => {
      console.log(res)
      // if (res.data.result) {
      //   let list = []
      //   let data = JSON.parse(res.data.data)
      //   data.list.map(item =>
      //     list.push({
      //       id: item.id,
      //       key: item.id,
      //       name: item.name,
      //       fromUnit: item.fromUnit,
      //       category: item.category,
      //       state: '待定'
      //     })
      //   )
      //   //console.log(data)
      //   this.setState({
      //     departmentList: data.departmentList,
      //     dataSource: list,
      //     _total: data.totalNum
      //   })
      // }

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
        title: '编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: '身份证号',
        dataIndex: 'sfzh',
        key: 'sfzh',
      },
      {
        title: '单位',
        key: 'unit',
        dataIndex: 'unit',
      },
      {
        title: '联系电话1',
        key: 'tel1',
        dataIndex: 'tel1',
      },
      {
        title: '联系电话2',
        key: 'tel2',
        dataIndex: 'tel2',
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
    const { id, name, sfzh, dataSource, pageSize, _total, loading } = this.state;
    return (
      <div>

        <Space
          style={{ margin: 20 }}
        >
          <Input addonBefore='编号' name='id' value={id} onChange={this.changeValue} />
          <Input addonBefore='姓名' name='name' value={name} onChange={this.changeValue} />
          <Input addonBefore='身份证号' name='sfzh' value={sfzh} onChange={this.changeValue} />
          <Button type='primary' onClick={this.fetch}>搜索</Button>
        </Space>
        <Button
          type='dashed'
          style={{ marginLeft: 20 }}
          onClick={() => { }}
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

export default ExpertManager