import React from 'react';
import { Table, Button } from 'antd'
import { getUserID } from '../../utils/auth'
import { getSimpleProjectList } from '../../services/project';

class ProjectList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      competitionID: props.state && props.state.id,
      dataSource: [],
      loading: false
    }
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    const params = {
      competitionID: this.props.location.state.id,
      expertId: getUserID()
    }
    getSimpleProjectList(params).then(res => {
      if (res.data.result) {
        const list = JSON.parse(res.data.data).list.map(item => {
          item.key = 'project_' + item.Id
          return item
        })
        console.log(list)
        this.setState({
          dataSource: list
        })
      }

    })
  }

  render() {
    const { dataSource, loading } = this.state
    const columns = [
      {
        title: '作品编号',
        dataIndex: 'Id',
        key: 'id'
      },
      {
        title: '作品名称',
        dataIndex: 'ProjectName',
        key: 'name'
      },
      {
        title: '参赛者',
        dataIndex: 'Sno',
        key: 'sno',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Button
            type='primary'
            size='small'
            shape='round'
            onClick={() => {
              //console.log("record.name:", record.name)
              this.props.history.push({ pathname: '/expert/project', state: { id: record.id } })
            }}
          >评分</Button>
        ),
      },
    ];
    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        scroll={{ y: 320 }}
      />
    )
  }
}


export default ProjectList;