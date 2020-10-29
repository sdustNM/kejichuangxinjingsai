import React from 'react'
import { Button, Table, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { getRecommendedProjectList_xiao, getResultLevels } from '../../../services/projectRecommend'
import ProjectInfo_administer from './ProjectInfo_administer'
import Awards from './Awards'

class RecommendProject_Xiao extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      competitionID: props.id,
      projectList: [],
      awardList: null,
      loading: false,
      visible: false,
      projectID: null
    }
  }

  async componentDidMount() {
    //根据比赛ID获取项目列表
    const projectList = await this.getProjectList(this.state.competitionID)
    if (projectList.length > 0) {
      const awardList = await this.getAwardList()
      console.log(projectList, awardList)
      this.setState({projectList, awardList})
    }
  }

  getProjectList = async competitionID => {
    const params = {
      competitionId: competitionID,
    }
    const res = await getRecommendedProjectList_xiao(params)
    if (res.result) {
      //console.log(JSON.parse(res.data))
      return JSON.parse(res.data).map((item, index) => {
        return {
          key: 'project_' + item.Id,
          index: index + 1,
          id: item.Id,
          name: item.ProjectName,
          sname: item.StudentName,
          score: item.LastScoreXiao || '未评分',
          scoredRate: item.ScoredRateXiao,
          recommended: item.RecommendedXiao
        }
      })
    }
  }

  getAwardList = async () => {
    const res = await getResultLevels()
    if (res.result) {
      return JSON.parse(res.data)
    }
  }

  showProject = projectID => {
    this.setState({
      visible: true,
      projectID,
    })
  }

  render() {
    const { projectList, loading, visible, projectID,awardList } = this.state
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index'
      },
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
        title: '评选',
        key: 'awards',
        render: (text, record) =>
          <Awards projectID={record.id} list={awardList} value={record.recommended} />
      },
      {
        title: '查看',
        key: 'action',
        render: (text, record) => (
          <Button
            type='default'
            size='small'
            shape='round'
            onClick={() => this.showProject(record.id)}
            icon={<SearchOutlined />}
          >
            查看
          </Button>
        ),
      },
    ];
    return (
      <div>
        <Table
          dataSource={projectList}
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