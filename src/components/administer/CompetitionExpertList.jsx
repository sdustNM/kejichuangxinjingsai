import React from 'react'
import { Table, Button, Divider, 
  Popconfirm, message  } from 'antd'
import CompetitionEditExpert from './CompetitionEditExpert';

import { PlusCircleOutlined } from '@ant-design/icons'

import { getExpertsInCompetition } from '../../services/administer/Competition'

class CompetitionExpertList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      expertID: '',
      editItem: {},
      visible: false
    }
  }

  componentDidMount() {
    getExpertsInCompetition({
      id: this.props.id
    }).then(res => {
      console.log(res)
      // if (res.data.result) {
      //   let list = []
      //   let data = JSON.parse(res.data.data)
      //   data.list.map(item =>
      //     list.push({
      //       id: item.id,
      //       key: item.id,
      //       name: item.name,
      //       fromUnit: item.fromUnit,
      //       category: item.category,
      //       state: '待定'
      //     })
      //   )
      //   //console.log(data)
      //   this.setState({
      //     departmentList: data.departmentList,
      //     dataSource: list,
      //     _total: data.totalNum
      //   })
      // }

    })
  }

  // showModal = () => {
  //   this.setState({
  //     visible: true,
  //   });
  // };

  // hideModal = () => {
  //   this.setState({
  //     visible: false
  //   })
  // }

  delete = id => {
    //移除操作
    message.success(id);
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
        title: '单位',
        dataIndex: 'unit',
        key: 'unit'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={this.confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type='danger'
              size='small'
              shape='round'
              onClick={record => { this.delete(record.key) }}
            >
              移除
            </Button>
          </Popconfirm>
        ),
      },
    ];
    const { dataSource, visible, editItem } = this.state
    return (
      <div>
        <Button type='default' onClick={this.showModal}>
          <PlusCircleOutlined />添加
        </Button>
        <Divider />
        <Table
          dataSource={dataSource}
          columns={columns}
        />
        <CompetitionEditExpert 
        visible={visible} 
        item={editItem} 
        hideModal={this.hideModal}
        ></CompetitionEditExpert>
      </div>
    )
  }
}

export default CompetitionExpertList