import React from 'react';
import { Table, Button, Space, Input } from 'antd';
import { getSimpleProjectList } from '../../../services/project'

class ProjectList extends React.Component {

  state = {
    dataSource: [],
    currentPage: 1,
    pageSize: 5,
    loading: false,
    _total: 0,
    comName: '',
    proName: ''
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

    currentPage = currentPage ? currentPage : this.state.currentPage
    pageSize = pageSize ? pageSize : this.state.pageSize
    const onlyRecommend = this.props.location.pathname === '/administer/projects' ? 0 : 1
    let params = {
      currentPage,
      pageSize,
      onlyRecommend,
      competitionName: this.state.comName,
      projectName: this.state.proName
    }
    console.log(params)
    getSimpleProjectList(params).then(res => {
      if (res.result) {
        console.log(res)
        const list = []
        const data = JSON.parse(res.data)
        data.list.map(item =>
          list.push({
            key: item.x.CompetitionId + '_' + item.x.Id,
            projectID: item.x.Id,
            competitionID: item.x.CompetitionId,
            competitionName: item.competitionName,
            projectName: item.x.ProjectName,
            teacherName: item.teacherName,
            cooperator: item.x.ProjectCooperator,
            yuanResult: item.result.yuan_recommend,
            xiaoResult: item.result.xiao_recommend,
            state: item.state,

          }))
        //console.log(list)
        this.setState({
          _total: data.totalNum,
          dataSource: list
        })

      }
    })
  }

  search = () => {
    this.setState({
      currentPage: 1
    })
    this.refresh(1)
  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { dataSource, pageSize, _total, loading, comName, proName } = this.state;
    const columns = [
      {
        title: '比赛编号',
        dataIndex: 'competitionID',
        key: 'competitionID',
        width: 150,
      },
      {
        title: '比赛名称',
        dataIndex: 'competitionName',
        key: 'competitionName',
      },
      {
        title: '作品名称',
        dataIndex: 'projectName',
        key: 'projectName'
      },
      {
        title: '指导老师',
        dataIndex: 'teacherName',
        key: 'teacherName'
      },
      {
        title: '共同完成人员',
        dataIndex: 'cooperator',
        key: 'cooperator',
      },
      {
        title: '项目状态',
        dataIndex: 'state',
        key: 'state',
      },
      {
        title: '院评结果',
        key: 'yuanResult',
        render: (text, record) =>
          record.yuanResult == "推荐" ? <span style={{ color: 'red' }}>{record.yuanResult}</span> : <span>{record.yuanResult}</span>

        ,
      },
      {
        title: '校评结果',
        key: 'xiaoResult',
        dataIndex: 'xiaoResult',
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
                this.props.history.push({ pathname: '/administer/projectInfoWithCompetitonInfo', state: { projectID: record.projectID, competitionID: record.competitionID } })
              }}
            >查看</Button>
          </Space>
        ),
      },
    ];

    return (
      <div>
        <Space style={{ margin: 20 }}>
          <Input addonBefore='比赛名称' name='comName' value={comName} onChange={this.changeValue} />
          <Input addonBefore='项目名称' name='proName' value={proName} onChange={this.changeValue} />
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

export default ProjectList