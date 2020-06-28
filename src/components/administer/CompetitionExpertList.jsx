import React from 'react'
import { Table, Button, Divider, 
  Popconfirm, message  } from 'antd'
import CompetitionEditExpert from './CompetitionEditExpert';

import { PlusCircleOutlined } from '@ant-design/icons'

const data = [
  {
    key: '991823',
    name: '王翀',
    gender: '男',
    unit: '山东科技大学'
  },
  {
    key: '99572',
    name: '滕腾',
    gender: '男',
    unit: '山东科技大学'
  }
];





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
    this.setState({
      dataSource: data,
      visible: false
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
  }

  confirm = (e) => {
    //移除操作
    console.log(e)
    message.success('Click on Yes');
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