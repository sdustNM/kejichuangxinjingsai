import React from 'react';
import { Table, Button, Avatar } from 'antd'
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
      competitionID: this.state.competitionID,
      expertId: getUserID()
    }
    getSimpleProjectList(params).then(res => {
      if (res.data.result) {
        const list = JSON.parse(res.data.data).list.map(item => {
          item.key = 'project_' + item.Id
          item.score = 9.5
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
        title: '评分',
        key: 'action',
        render: (text, record) => (
          <div>
            {record.score && <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{record.score}</Avatar>}
            <Button
            type='primary'
            size='small'
            shape='round'
            onClick={() => {
              //console.log("record.name:", record.name)
              this.props.history.push({ pathname: '/expert/project', state: { id: record.Id } })
            }}
          >评分</Button>
          </div>
          
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