import React from 'react'
import { Button, Space, Table, Avatar, message, Modal } from 'antd'
import { SearchOutlined, LikeTwoTone, StopTwoTone } from '@ant-design/icons'
import { getRecommendedProjectList_xiao, setProjectRecommend_xiao, cancelProjectRecommend_xiao } from '../../../services/projectRecommend'
import ProjectInfo_administer from './ProjectInfo_administer'

class RecommendProject_Xiao extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      competitionID: props.id,
      dataSource: [],
      loading: false,
      visible: false,
      projectID: null
    }
  }

  componentDidMount() {
    //根据比赛ID获取项目列表
    this.getProjectList(this.state.competitionID)
  }

  getProjectList = competitionID => {
    const params = {
      competitionId: competitionID,
    }
    getRecommendedProjectList_xiao(params).then(res => {
      if (res.data.result) {
        console.log(JSON.parse(res.data.data))
        const projectList = JSON.parse(res.data.data).map(item => {
          return {
            key: 'project_' + item.Id,
            id: item.Id,
            name: item.ProjectName,
            sname: item.StudentName,
            score: item.LastScoreXiao || '未评分',
            scoredRate: item.ScoredRateXiao,
            recommended: item.RecommendedXiao
          }
        })
        //console.log(projectList)
        this.setState({
          dataSource: projectList
        })
      }
    })
  }

  showProject = projectID => {
    this.setState({
      visible: true,
      projectID,
    })
  }

  setRecommend = id => {
    setProjectRecommend_xiao({
      ProjectId: id
    }).then(res => {
      if (res.data.result) {
        message.success('作品推荐成功！')
        this.getProjectList(this.state.competitionID, this.state.deptID)
      }
      else {
        message.warning('作品推荐失败！')
      }
    })
  }

  cancelRecommend = id => {
    cancelProjectRecommend_xiao({
      ProjectId: id
    }).then(res => {
      if (res.data.result) {
        message.success('取消推荐成功！')
        this.getProjectList(this.state.competitionID, this.state.deptID)
      }
      else {
        message.warning('取消推荐失败！')
      }
    })
  }

  render() {
    const { dataSource, loading, visible, projectID } = this.state
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
        title: '评分进度（已评人数/评委人数）',
        dataIndex: 'scoredRate',
        key: 'scoredRate',
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
            <Button
              type='default'
              size='small'
              shape='round'
              onClick={() => this.showProject(record.id)}
              icon={<SearchOutlined />}
            >
              查看
                </Button>
            {
              !record.recommended ? (
                <Button
                  type='primary'
                  size='small'
                  shape='round'
                  icon={<LikeTwoTone />}
                  onClick={() => this.setRecommend(record.id)}
                >
                  推荐
                </Button>
              ) : (
                  <Button
                    type='danger'
                    size='small'
                    shape='round'
                    icon={<StopTwoTone twoToneColor='#eb2f96' />}
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
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
        //scroll={{ y: 320 }}
        />
        <Modal
          title="评分"
          visible={visible}
          onCancel={() => this.setState({ visible: false })}
          footer={[]}
          width={800}
          destroyOnClose
        >
          <ProjectInfo_administer projectID={projectID} ></ProjectInfo_administer>
        </Modal>
      </div>
    )
  }
}

export default RecommendProject_Xiao