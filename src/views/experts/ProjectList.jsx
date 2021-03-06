import React from 'react';
import { Table, Button, Avatar } from 'antd'
//import { getUserID } from '../../utils/auth'
import { getSimpleProjectListForExpert } from '../../services/project';

class ProjectList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      competitionID: props.location.state && props.location.state.id,
      anonymous: props.location.state && props.location.state.anonymous,
      dataSource: [],
      loading: false
    }
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    const params = {
      competitionId: this.state.competitionID,
    }
    getSimpleProjectListForExpert(params).then(res => {
      //console.log(res)
      if (res.result) {
        let list = JSON.parse(res.data)
        //console.log(list)
        list = list.map(item => {
          item.key = 'project_' + item.Id
          if(this.state.anonymous){
            item.teacherName = '匿名'
            item.studentName = '匿名'
            item.ProjectCooperator = '匿名'
          }
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
    const { anonymous, dataSource, loading } = this.state
    const columns = [
      {
        title: '作品名称',
        dataIndex: 'ProjectName',
        key: 'ProjectName'
      },
      {
        title: '参赛学生',
        dataIndex: 'studentName',
        key: 'studentName',
      },
      {
        title: '指导教师',
        dataIndex: 'teacherName',
        key: 'teacherName',
      },{
        title: '合作人员',
        dataIndex: 'ProjectCooperator',
        key: 'ProjectCooperator',
      },
      {
        title: '分数',
        key: 'ExpertScore',
        render: (text, record) => 
        {return record.ExpertScore && <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{record.ExpertScore}</Avatar>}    
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <div>
            <Button
            type='primary'
            size='small'
            shape='round'
            onClick={() => {
              //console.log("record.name:", record.name)
              this.props.history.push({ pathname: '/expert/project', state: { projectID: record.Id, anonymous, score:record.ExpertScore } })
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