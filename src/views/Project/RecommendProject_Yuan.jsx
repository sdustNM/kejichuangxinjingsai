import React from 'react'
import { Button, Space, Table, Avatar, Select, message } from 'antd'
import { SearchOutlined, LikeTwoTone, StopTwoTone } from '@ant-design/icons'
import { getRecommendedProjectList_yuan, setProjectRecommend_yuan, cancelProjectRecommend_yuan } from '../../services/projectRecommend'
import { getDeptID } from '../../utils/auth'
import getDepartmentList from '../../redux/common'

const { Option } = Select

class RecommendProject_Yuan extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      competitionID: props.id,
      dataSource: [],
      loading: false,
      departmentList: [],
      deptID: ''
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
      //console.log(departmentList)
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
      if (res.data.result) {
        console.log(JSON.parse(res.data.data))
        const projectList = JSON.parse(res.data.data).map(item => {
          return {
            key: 'project_' + item.Id,
            id: item.Id,
            name: item.ProjectName,
            sname: item.StudentName,
            score: item.LastScoreYuan || '未评分',
            scoredRate: item.ScoredRateYuan,
            recommended: item.RecommendedYuan
          }
        })
        //console.log(projectList)
        this.setState({
          dataSource: projectList
        })
      }
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
    cancelProjectRecommend_yuan({
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
              //onClick={}
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
        <Space style={{ marginBottom: 10 }}>
          <Select
            value={this.state.deptID}
            style={{ width: 200 }}
            onChange={this.handleDeptChange}
          >
            {this.state.departmentList.map(
              item => <Option key={'department_' + item.id} value={item.id} >{item.name}</Option>)}
          </Select>
        </Space>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          //scroll={{ y: 320 }}
        //size='small'
        />
      </div>

    )
  }
}

export default RecommendProject_Yuan