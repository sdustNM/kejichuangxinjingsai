import React from 'react'
import { Button, Space, Table, Avatar } from 'antd'

import { getRecommendedProjectList_yuan, setProjectRecommend_yuan, cancelProjectRecommend_yuan } from '../../services/projectRecommend'
import { getDeptID } from '../../utils/auth'

class RecommendProject extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      competitionID: props.id,
      dataSource: [],
      loading: false
    }
  }

  componentDidMount() {
    //根据比赛ID获取项目列表
    const params = {
      competitionId: this.state.competitionID,
      deparmentId: getDeptID()
    }
    console.log(params)
    getRecommendedProjectList_yuan(params).then(res => {
      if (res.data.result) {
        console.log(JSON.parse(res.data.data))
        const projectList = JSON.parse(res.data.data).map(item => {
          return {
            key: 'project_' + item.Id,
            id: item.Id,
            name: item.ProjectName,
            sname: item.StudentName,
            score: item.LastScoreYuan,
            recommended: item.RecommendedYuan
          }
        })
        console.log(projectList)
        this.setState({
          dataSource: projectList
        })
      }
    })
  }

  setRecommend = id => {
    setProjectRecommend_yuan({
      ProjectId: id
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    const { dataSource, loading } = this.state
    const columns = [
      {
        title: '作品编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '作品名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '参赛者',
        dataIndex: 'sname',
        key: 'sname',
      },
      {
        title: '分数',
        dataIndex: 'score',
        key: 'score',
      },
      {
        title: '是否推荐',
        key: 'recommended',
        render: (text, record) =>
          !record.recommended ? '' :
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>已推荐</Avatar>
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space>
            {
              !record.recommended ? (
                <Button
                  type='primary'
                  size='small'
                  shape='round'
                  onClick={() => this.setRecommend(record.id)}
                >
                  推荐
                </Button>
              ) : (
                  <Button
                    type='danger'
                    size='small'
                    shape='round'
                    onClick={() => this.cancelRecommend(record.id)}
                  >
                    取消
                  </Button>
                )
            }

          </Space>

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

export default RecommendProject