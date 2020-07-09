import React from 'react';
import { Table, Space, Button, Select, Input,Row } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { getCompetitionList } from '../../../services/administer/competition'
import { getDeptID } from '../../../utils/auth'
import getDepartmentList from '../../../redux/common'

const { Option } = Select

class CompetitionManagerXiao extends React.Component {

  state = {
    dataSource: [],
    departmentList: [],
    currentPage: 1,
    pageSize: 5,
    loading: false,
    _total: 0,
    comName: ''
  }

  componentDidMount() {
    getDepartmentList().then(res => {
      let departmentList = JSON.parse(res)
      //console.log(departmentList)
      if (departmentList.length !== 0) {
        this.setState({ departmentList })
      }
    })
    this.refresh();
  }

  pageChange = (currentPage, pageSize) => {
    this.setState({
      currentPage,
      pageSize
    })
    this.refresh();
  }
  showSizeChange = (current, pageSize) => {

    this.setState({
      current: 1,
      pageSize
    })
    this.refresh();
  }

  refresh = () => {
    
    let params = {
      DepartmentId: getDeptID(),
      comName: this.state.comName,
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize
    }
    //console.log(params)
    getCompetitionList(params).then(res => {
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
            state: '待定'
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
        key: 'id'
      },
      {
        title: '比赛名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '组织单位',
        dataIndex: 'fromUnit',
        key: 'fromUnit',
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
                console.log("record.name:",record.name)
                this.props.history.push({ pathname: '/administer/competitionEdit', state: { id: record.id,comName:record.name } })
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
    const { dataSource, pageSize, _total, loading, comName } = this.state;
    //console.log(this.state.departmentList)
    return (
      <div>

        <Space>
          <Button
            type='dashed'
            style={{ margin: 20 }}
            onClick={() => { this.props.history.push({ pathname: '/administer/competitionEdit', state: { id: null } }) }}
          >
            <PlusCircleOutlined />添加
        </Button>
          <Select defaultValue="0" style={{ width: 200 }} >
            {this.state.departmentList.map(
              item => <Option key={'department_' + item.id} value={item.id} disabled={item.id !== '0'}>{item.name}</Option>)}
          </Select>
          <Input addonBefore='比赛名称' name='comName' value={comName} onChange={this.changeValue} />
          <Button type='primary' onClick={this.refresh}>搜索</Button>
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
          scroll={{ y: 320 }}
        />
      </div>
    )
  }
}

export default CompetitionManagerXiao;