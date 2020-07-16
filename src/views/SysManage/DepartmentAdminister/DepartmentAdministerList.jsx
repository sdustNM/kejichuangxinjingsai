import React from 'react'
import { Table, Space, Button, Divider, Popconfirm, message, Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import {getDepartmentAdministerList} from '../../../services/administer/deparmentAdminister'
import DepartmentAdministerEdit from './DepartmentAdministerEdit'


class DepartmentAdministerList extends React.Component {
  state = {
    dataSource: [],
    currentPage: 1,
    pageSize: 10,
    loading: false,
    _total: 0,
    visible: false,
    departmentId: -1,
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {

    getDepartmentAdministerList()
      .then(res => {
        console.log(res)
        if (res.data.result) {
          let json=JSON.parse(res.data.data)
          let list = json.map((item) => {
            return {
              "id": item.id,
              "name": item.name,
              "key": item.id,
              "list": item.list
            }

          })

          if (json && json.length > 0) {
            this.setState({
              dataSource: list,
              _total: json.length
            })
          }
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
    this.fetch()
  }
  

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        width:100,
        padding:100
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '指定管理员',
        key: 'action',
        render: (text, record) => (
          <Space>
            <span style={{color:'blue'}}>{record.list}</span>
            <Button
              type='dash'
              size='small'
              shape='round'
              onClick={() => {
                this.setState({
                    departmentId: record.id,
                    visible: !visible,
                  });
                }
              }
            >选择</Button>

          </Space>
        ),
      },
    ];
    const { dataSource, pageSize, _total, loading, visible } = this.state;
    return (
      <div>

        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize: pageSize,
            pageSizeOptions: ['5', '10', '20', '50'],
            showSizeChanger: true,
            showQuickJumper: true,
            total: _total,
            showTotal: (total, range) => `第${range[0]}-${range[1]}条 共${total}条`,
            onChange: this.pageChange,
            onShowSizeChange: this.showSizeChange,
          }}
          loading={loading}
          scroll={{ y: 600 }}
        />
        <Modal
          width={600}
          title="选择管理员"
          visible={visible}
          onCancel={this.hideModal}
          destroyOnClose={true}
          footer={[
            <Button key='close' onClick={this.hideModal}>
              关闭
            </Button>
          ]}
        >
          <DepartmentAdministerEdit departmentId={this.state.departmentId} hideModal={this.hideModal}></DepartmentAdministerEdit>
        </Modal>
      </div>
    )
  }
}

export default DepartmentAdministerList