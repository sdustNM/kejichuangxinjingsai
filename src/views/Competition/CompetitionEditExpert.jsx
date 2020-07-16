import React from 'react'
import { Button, Input, Space, Table, Popconfirm, message } from 'antd'
import { getExpertsByFuzzy } from '../../services/administer/expert'
import { addExpertForCompetition } from '../../services/administer/competition'
class CompetitionEditExpert extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
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
  }
  componentDidMount() {
    this.fetch(this.state.currentPage, this.state.pageSize)
  }

  pageChange = (currentPage, pageSize) => {
    this.setState({
      currentPage,
      pageSize
    })
    this.fetch(currentPage, pageSize);
  }
  showSizeChange = (current, pageSize) => {

    this.setState({
      currentPage: 1,
      pageSize
    })
    this.fetch(1, pageSize);
  }

  search = () => {
    this.setState({
      currentPage: 1,
    })
    this.fetch(1, this.state.pageSize)
  }

  fetch = (currentPage, pageSize) => {
    const { id, name, sfzh } = this.state
    //console.log(this.state)
    getExpertsByFuzzy({
      id,
      name,
      sfzh,
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
            gender: item.gender,
            sfzh: item.sfzh,
            unit: item.unit,
            tel1: item.tel1,
            tel2: item.tel2
          })
        )
        //console.log(data)
        this.setState({
          departmentList: data.departmentList,
          dataSource: list,
          _total: data.totalNum
        })
      }

    })
  }

  add = (expertID) => {  
    let params = {
      expertID,
      competitionID: this.props.competitionID,
      department: this.props.departmentID
    }
    console.log(params)
    addExpertForCompetition(params).then(
      res => {
        if(res.data.result){
          message.success('添加成功！', 1)
        }
        else{
          message.error(res.data.message, 1)
        }
      }
    )
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
        key: 'gender'
      },
      {
        title: '身份证号',
        dataIndex: 'sfzh',
        key: 'sfzh'
      },
      {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Popconfirm
            title={`确认将${record.name}添加为当前竞赛的评审人员?`}
            onConfirm={() => this.add(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button
              type='primary'
              size='small'
              shape='round'
            >
              选择
            </Button>
          </Popconfirm>
        ),
      },
    ];
    const { id, name, sfzh, dataSource, pageSize, _total, loading } = this.state;
    return (
      <div >
        <Space
          style={{ marginBottom: 20 }}
        >
          <Input addonBefore='编号' name='id' value={id} onChange={this.changeValue} />
          <Input addonBefore='姓名' name='name' value={name} onChange={this.changeValue} />
          <Input addonBefore='身份证号' name='sfzh' value={sfzh} onChange={this.changeValue} />
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

export default CompetitionEditExpert