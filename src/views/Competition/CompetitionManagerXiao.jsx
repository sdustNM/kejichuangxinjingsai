import React from 'react';
import { Table, Space, Button, Select, Input, Card, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { getCompetitionList } from '../../services/administer/competition'
//import { getDeptID } from '../../utils/auth'
import getDepartmentList from '../../redux/common'
import { isSuperAdminister } from '../../utils/auth';
import { deleteCompetiton } from '../../services/administer/competition'

const { Option } = Select

class CompetitionManagerXiao extends React.Component {

  state = {
    dataSource: [],
    departmentList: [],
    currentPage: 1,
    pageSize: 5,
    loading: false,
    _total: 0,
    comName: '',
    // isPublished: true
  }

  componentDidMount() {
    getDepartmentList().then(res => {
      let departmentList = JSON.parse(res).filter(item => item.id === '0')
      //console.log(departmentList)
      if (departmentList.length !== 0) {
        this.setState({ departmentList })
      }
    })
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
  refresh = (currentPage, pageSize ) => {

    currentPage = currentPage ? currentPage : this.state.currentPage
    pageSize = pageSize ? pageSize : this.state.pageSize
    //deptID = deptID ? deptID : this.state.department
    let params = {
      DepartmentId: "0",
      comName: this.state.comName,
      currentPage,
      pageSize
    }
    //console.log(params)
    getCompetitionList(params).then(res => {
      //console.log(res)
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
            //category: item.category,
            status: item.status
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

  handleDeptChange = value => {
    this.setState({
      department: value
    })
    this.refresh(this.state.currentPage, this.state.pageSize, value)
  }

  changeValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  delete = competitionID => {
    deleteCompetiton({ competitionID }).then(res => {
      if(res.result){
        message.success('删除成功')
        this.refresh()
      }

    })
  }

  render() {
    const { dataSource, pageSize, _total, loading, comName } = this.state;
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
        title: '比赛状态',
        key: 'status',
        dataIndex: 'status',
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
                //console.log("record:", record)
                this.props.history.push({ pathname: '/administer/competitionEdit', state: { id: record.id, comName: record.name } })
              }}
            >详细</Button>
            {
              isSuperAdminister() && (
                <Button
                  type='danger'
                  size='small'
                  shape='round'
                  onClick={() => { this.delete(record.id) }}
                >删除</Button>
              )
            }
          </Space>
        ),
      },
    ];

    const title = (
      <Space style={{ margin: 10 }}>
        <Select
          defaultValue='0'
          style={{ width: 200 }}
          onChange={this.handleDeptChange}
        >
          {this.state.departmentList.map(
            item => <Option key={'department_' + item.id} value={item.id} >{item.name}</Option>)}
        </Select>
        <Input addonBefore='比赛名称' name='comName' value={comName} onChange={this.changeValue} />
        <Button type='primary' onClick={this.search}>搜索</Button>
      </Space>
    )
    const extra =
      isSuperAdminister() && (
        <Button
          type='primary'
          style={{ margin: 10 }}
          onClick={() => { this.props.history.push({ pathname: '/administer/competitionEdit', state: { id: null } }) }}
        >
          <PlusCircleOutlined />添加
        </Button>)

    return (
      <Card title={title} extra={extra}>

        <Table
          //bordered
          size='middle'
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
      </Card>
    )
  }
}

export default CompetitionManagerXiao;