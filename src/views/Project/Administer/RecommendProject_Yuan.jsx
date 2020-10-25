import React from 'react'
import { Card, Alert, Divider, Popconfirm, Button, Space, Table, Avatar, Select, message, Modal } from 'antd'
import { SearchOutlined, LikeTwoTone, StopTwoTone } from '@ant-design/icons'
import {
  getRecommendedProjectList_yuan,
  setProjectRecommend_yuan,
  cancelProjectRecommend_yuan,
  confirmRecommend
} from '../../../services/projectRecommend'
import { getDeptID, isAdminister } from '../../../utils/auth'
import getDepartmentList from '../../../redux/common'
import ProjectInfo_administer from '../Administer/ProjectInfo_administer'

const { Option } = Select

class RecommendProject_Yuan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      competitionID: props.id,
      dataSource: [],
      loading: false,
      departmentList: [],
      deptID: '',
      visible: false,
      projectID: null,
      rateNum: 0,
      realNum: 0,
      canRecommend: false
    }
  }

  componentDidMount() {
    //根据比赛ID获取项目列表
    const deptID = getDeptID()
    getDepartmentList().then(res => {
      let departmentList = JSON.parse(res)
      if (deptID === '0') {
        departmentList = departmentList.filter(item => item.id !== '0')
      }
      else {
        departmentList = departmentList.filter(item => item.id === deptID)
      }
      if (departmentList.length !== 0) {
        this.setState({
          departmentList,
          deptID: departmentList[0].id
        })
        return Promise.resolve(departmentList[0].id)
      }
      else {
        return Promise.resolve('-1')
      }
    }).then(res => {
      if (res === '-1') return
      this.getProjectList(this.state.competitionID, res)
    })
  }

  getProjectList = (competitionID, deptID) => {
    const params = {
      competitionId: competitionID,
      deparmentId: deptID
    }
    //console.log(params)
    getRecommendedProjectList_yuan(params).then(res => {
      if (res.result) {
        const data = JSON.parse(res.data)
        //console.log(data)
        const projectList = data.list.map((item, index) => {
          return {
            key: 'project_' + item.Id,
            index: index + 1,
            id: item.Id,
            name: item.ProjectName,
            sname: item.StudentName,
            score: item.LastScoreYuan || '未评分',
            scoredRate: item.ScoredRateYuan,
            recommended: item.RecommendedYuan
          }
        })
        this.setState({
          dataSource: projectList,
          rateNum: data.rateNum,
          realNum: data.realNum,
          canRecommend: data.canRecommend
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

  handleDeptChange = value => {
    this.setState({
      deptID: value
    })
    //console.log(value)
    this.getProjectList(this.state.competitionID, value)
  }
  setRecommend = id => {
    setProjectRecommend_yuan({
      ProjectId: id
    }).then(res => {
      if (res.result) {
        message.success('作品推荐成功！')
        this.getProjectList(this.state.competitionID, this.state.deptID)
      }
    })
  }

  cancelRecommend = id => {
    cancelProjectRecommend_yuan({
      ProjectId: id
    }).then(res => {
      if (res.result) {
        message.success('取消推荐成功！')
        this.getProjectList(this.state.competitionID, this.state.deptID)
      }
    })
  }

  confirmRecommend = async () => {
    const params = {
      competitionId: this.state.competitionID,
      departmentId: this.state.deptID
    }
    const res = await confirmRecommend(params)
    console.log(res)
    if (res.result) {
      this.setState({ canRecommend: false })
    }
  }

  render() {
    const { dataSource, loading, visible, projectID, rateNum, realNum, canRecommend } = this.state
    const numShow = (
      <>
        <span>最大推荐数：</span>
        <span style={{ color: '#cf1322', fontSize: 20 }}>{rateNum}</span>
        <Divider type="vertical" />
        <span>已推荐数：</span>
        <span style={{ color: '#3f8600', fontSize: 20 }}>{realNum}</span>
      </>

    )
    const title = (
      <Space>
        <Select
          value={this.state.deptID}
          style={{ width: 200 }}
          onChange={this.handleDeptChange}
        >
          {this.state.departmentList.map(
            item => <Option key={'department_' + item.id} value={item.id} >{item.name}</Option>)}
        </Select>
        <Alert message={numShow} type="info" />
      </Space>
    )
    const extra = (
      <Popconfirm
        title="如果确认推荐到学校，结果将无法撤回！您是否确认？"
        onConfirm={this.confirmRecommend}
        //onCancel={cancel}
        okText="确认"
        cancelText="取消"
      >
        <Button type='primary'>推荐确认提交</Button>
      </Popconfirm>
    )
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
        title: '是否推荐',
        key: 'recommended',
        render: (text, record) =>
          !record.recommended ? '' :
            <Avatar size='large' style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>荐</Avatar>
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
              (isAdminister() && canRecommend) && (!record.recommended ? (
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
                ))
            }

          </Space>

        ),
      },
    ];

    return (
      <div>
        <Card
          title={title}
          extra={(isAdminister() && canRecommend) && extra}
          headStyle={{ backgroundColor: '#f2f3f4' }}
        >
          <Table
            dataSource={dataSource}
            columns={columns}
            loading={loading}
          //scroll={{ y: 320 }}
          //size='small'
          />
        </Card>

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

export default RecommendProject_Yuan