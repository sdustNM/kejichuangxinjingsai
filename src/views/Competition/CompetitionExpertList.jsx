import React from 'react'
import {
  Table, Button, Divider,
  Popconfirm, message, Modal
} from 'antd'
import CompetitionEditExpert from './CompetitionEditExpert';

import { PlusCircleOutlined } from '@ant-design/icons'
import { getExpertsInCompetition, removeExpertFromCompetition } from '../../services/administer/competition'
import { getDeptID } from '../../utils/auth';

class CompetitionExpertList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deptID: getDeptID(),
      dataSource: [],
      visible: false
    }
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = () => {
    //console.log(this.props.id, this.state.deptID)
    getExpertsInCompetition({
      id: this.props.id,
      departmentNo: this.state.deptID
    }).then(res => {
      //console.log(res)
      if (res.result) {
        let list = []
        let data = JSON.parse(res.data)
        data.map(item =>
          list.push({
            id: item.id,
            key: item.id,
            name: item.name,
            unit: item.unit,
            gender: item.gender,
            sfzh: item.sfzh,
            tel1: item.Tel1,
            tel2: item.Tel2
          })
        )
        //console.log(data)
        this.setState({
          dataSource: list,
        })
      }

    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    })
    this.refresh()
  }

  remove = expertID => {
    //移除操作
    let params = {
      expertID,
      competitionID: this.props.id,
      department: this.state.deptID
    }
    console.log(params)
    removeExpertFromCompetition(params).then(
      res => {
        if (res.result) {
          message.success('移除成功！', 1)
          this.refresh()
        }
        else {
          message.error(res.message, 1)
        }
      }
    )
  }


  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        key: 'ID'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender'
      },
      {
        title: '身份证号',
        dataIndex: 'sfzh',
        key: 'sfzh'
      },
      {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit'
      },
      {
        title: '联系电话1',
        dataIndex: 'tel1',
        key: 'tel1'
      },
      {
        title: '联系电话2',
        dataIndex: 'tel2',
        key: 'tel2'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Popconfirm
            disabled={this.props.isEnd}
            title={`确认将${record.name}移除当前竞赛评审组?`}
            onConfirm={() => { this.remove(record.id) }}
            okText="确认"
            cancelText="取消"
          >
            <Button
              type='danger'
              size='small'
              shape='round'
              disabled={this.props.isEnd}
            >
              移除
            </Button>
          </Popconfirm>
        ),
      },
    ];
    const { deptID, dataSource, visible } = this.state
    return (
      <div>
        <Button type='default' onClick={this.showModal} disabled={this.props.isEnd}>
          <PlusCircleOutlined />添加
        </Button>
        <Divider />
        <Table
          dataSource={dataSource}
          columns={columns}
        />
        <Modal
          width={960}
          title="选择专家"
          visible={visible}
          onCancel={this.hideModal}
          footer={[
            <Button key='close' onClick={this.hideModal}>
              关闭
            </Button>
          ]}
        >
          <CompetitionEditExpert competitionID={this.props.id} departmentID={deptID} expertList={dataSource}></CompetitionEditExpert>
        </Modal>
      </div>
    )
  }
}

export default CompetitionExpertList