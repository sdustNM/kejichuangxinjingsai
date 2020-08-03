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
    let params = {
      currentPage,
      pageSize,
      competitionName: this.state.comName,
      projectName: this.state.proName
    }
    console.log(params)
    getSimpleProjectList(params).then(res => {
      if (res.data.result) {
        //console.log(res)
        const list = []
        console.log(JSON.parse(res.data.data).list)
        JSON.parse(res.data.data).list.map(item =>
          list.push({
            key: item.x.CompetitionId + '_' + item.x.Id,
            competitionID: item.x.CompetitionId,
            competitionName: item.competitionName,
            projectName: item.x.ProjectName,
            teacherName: item.teacherName,
            cooperator: item.x.ProjectCooperator,
            result: '未知XXX'
          }))
        //console.log(list)
          this.setState({
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
        title: '作品评定',
        key: 'result',
        dataIndex: 'result',
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
                this.props.history.push({ pathname: '/student/competition', state: { id: record.competitionID } })
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
          scroll={{ y: 320 }}
        />
      </div>
    )
  }
}

export default ProjectList