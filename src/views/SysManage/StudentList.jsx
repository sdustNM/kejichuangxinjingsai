import React from 'react'
import { Table, Space, Button, Input, Modal, Spin, message, Popconfirm } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { ImportStudentFromRemote, getStudentsByFuzzy } from '../../services/administer/student'
import { CheckCircleTwoTone } from '@ant-design/icons';

class StudentList extends React.Component {
  state = {
    sno: '',
    name: '',
    dataSource: [],
    currentPage: 0,
    pageSize: 10,
    loading: false,
    _total: 0,
    visible: false,
    expertId: ''
  }

  componentDidMount() {
    this.refresh(this.state.currentPage, this.state.pageSize)
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
      currentPage: 0,
      pageSize
    })
    this.refresh(0, pageSize);
  }

  search = () => {
    this.setState({
      currentPage: 0,
    })
    this.refresh(0, this.state.pageSize)
  }

  refresh = (currentPage, pageSize) => {
    const { sno, name } = this.state
    console.log(this.state)
    if (!currentPage) currentPage = this.state.currentPage
    if (!pageSize) pageSize = this.state.pageSize
    getStudentsByFuzzy({
      sno,
      name,
      currentPage,
      pageSize
    }).then(res => {
      console.log(res)
      if (res.result) {
        let list = []
        let data = JSON.parse(res.data)
        data.list.map(item =>
          list.push({
            sno: item.Sno,
            key: item.Sno,
            name: item.Name,
            gender: item.Gender === '1' ? '男' : '女',
            classname: item.ClassName,
            departmentName: item.DepartmentName
          })
        )
        console.log(list)
        this.setState({
          dataSource: list,
          _total: data.totalNum
        })
      }

    })
  }

  importStudentFromRemoteClick = () => {
    this.setState({
      loading: true
    })
    ImportStudentFromRemote().then(res => {
      this.setState({
        loading: false
      })
      if (res.result) {
        Modal.confirm({
          title: '通知',
          icon: <CheckCircleTwoTone />,
          content: '数据云同步完成!',
          okText: '确认',
          cancelButtonProps: { disabled: true },
        });
        this.refresh(1)
      }
      else {
        message.error(res.message)
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
        title: '编号',
        dataIndex: 'sno',
        key: 'sno'
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
        title: '班级',
        key: 'classname',
        dataIndex: 'classname',
      },
      {
        title: '学院',
        key: 'departmentName',
        dataIndex: 'departmentName',
      },

    ];
    const { sno, name, dataSource, pageSize, _total, loading, visible } = this.state;
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Space
            style={{ margin: 20 }}
          >
            <Input addonBefore='学号' name='sno' value={sno} onChange={this.changeValue} />
            <Input addonBefore='姓名' name='name' value={name} onChange={this.changeValue} />
            <Button type='primary' onClick={this.search}>搜索</Button>
            {/* <Button
          style={{ marginLeft: 20 }}
          onClick={() => { this.showModal() }}
        >
          <PlusCircleOutlined />添加
        </Button> */}
            <Popconfirm placement="top" title="确认开始同步所有学生信息吗？" onConfirm={() => { this.importStudentFromRemoteClick() }}>
              <Button
                type='dashed'
                style={{ marginLeft: 20 }}
                onClick={() => { }}
              >
                <PlusCircleOutlined />云端同步
        </Button>
            </Popconfirm>
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

          //scroll={{ y: 320 }}
          />
        </Spin>
      </div>
    )
  }
}

export default StudentList