import React from 'react'
import { Modal, Button, Input, Divider, Table, Popconfirm } from 'antd'

// const data = [
//   {
//     key: '991823',
//     name: '王翀',
//     gender: '男',
//     unit: '山东科技大学'
//   },
//   {
//     key: '99572',
//     name: '滕腾',
//     gender: '男',
//     unit: '山东科技大学'
//   }
// ];

class CompetitionEditExpert extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
    }
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
              type='primary'
              size='small'
              shape='round'
              onClick={record => { this.delete(record.key) }}
            >
              添加
            </Button>
          </Popconfirm>
        ),
      },
    ];
    return (
      <Modal
        title="专家列表"
        visible={this.props.visible}
        footer={[
          <Button key="cancel" type="primary" onClick={this.props.hideModal}>
            关闭
          </Button>,
        ]}
      >
        <div style={{ marginBottom: 16 }}>
          <Input addonBefore="编号" />
          <Input addonBefore="姓名" />
        </div>
        <Divider />
        <Table
          dataSource={this.state.dataSource}
          columns={columns}
        />
      </Modal>
    )
  }

}

export default CompetitionEditExpert