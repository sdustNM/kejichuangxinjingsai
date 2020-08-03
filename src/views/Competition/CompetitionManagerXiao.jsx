import React from 'react';
import { Table, Space, Button, Select, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { getCompetitionList } from '../../services/administer/competition'
//import { getDeptID } from '../../utils/auth'
import getDepartmentList from '../../redux/common'
import { isSuperAdminister } from '../../utils/auth';

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
      let departmentList = JSON.parse(res).filter(item => item.id == '0')
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
  refresh = (currentPage, pageSize, deptID) => {

    currentPage = currentPage ? currentPage : this.state.currentPage
    pageSize = pageSize ? pageSize : this.state.pageSize
    deptID = deptID ? deptID : this.state.department
    let params = {
      DepartmentId: deptID,
      comName: this.state.comName,
      currentPage,
      pageSize
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

  handleDeptChange = value => {
    this.setState({
      department: value
    })
    this.refresh(this.state.currentPage, this.state.pageSize, value)
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
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
            {/* <Button
              type={isPublished ? 'danger' : 'primary'}
              size='small'
              shape='round'
              onClick={() => this.publish(record.id)}
            >
              {isPublished ? '关闭' : '发布'}
            </Button> */}
            <Button
              type='primary'
              size='small'
              shape='round'
              onClick={() => {
                //console.log("record.name:", record.name)
                this.props.history.push({ pathname: '/administer/competitionEdit', state: { id: record.id, comName: record.name } })
              }}
            >详细</Button>
            {
              isSuperAdminister() && (
                <Button
                  type='danger'
                  size='small'
                  shape='round'
                >删除</Button>
              )
            }
          </Space>
        ),
      },
    ];

    //console.log(this.state.departmentList)
    return (
      <div>

        <Space style={{ margin: 20 }}>
          {
            isSuperAdminister() && (
              <Button
                type='dashed'
                style={{ margin: 20 }}
                onClick={() => { this.props.history.push({ pathname: '/administer/competitionEdit', state: { id: null } }) }}
              >
                <PlusCircleOutlined />添加
              </Button>)
          }
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