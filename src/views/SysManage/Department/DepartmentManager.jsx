import React from 'react'
import { Table, Space, Button, Popconfirm, message, Modal } from 'antd';
import { PlusCircleOutlined,CheckCircleTwoTone } from '@ant-design/icons'
import getDepartmentList from '../../../redux/common';
import DepartmentEdit from './DepartmentEdit'
import {deleteDepartment,ImportDepartmentFromRemote} from '../../../services/administer/department'

class DeparmentManager extends React.Component {
  state = {
    dataSource: [],
    currentPage: 1,
    pageSize: 10,
    loading: false,
    _total: 0,
    visible: false,
    departmentId: -1
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = () => {
    console.log(this.state)
    getDepartmentList(true).then(res => JSON.parse(res))
      .then(data => {
        let list = data.map((item) => {
          return {
            "id": item.id,
            "name": item.name,
            "key": item.id
          }

        })
        console.log(data)
        if (data && data.length > 0) {
          this.setState({
            dataSource: list,
            _total: data.length
          })
        }

      })
  }

  importDepartment=()=>{
    this.setState({
      loading:true
    })
    ImportDepartmentFromRemote().then(res=>{
      this.setState({
        loading:false
      })
      if (res.result)
      {
          Modal.confirm({
            title: '通知',
            icon: <CheckCircleTwoTone  />,
            content: '数据云平台完成!',
            okText: '确认',
          });
          this.fetch()
      }
      else {
        message.error(res.message)
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

  delete=(id)=>{
    deleteDepartment(id).then(res=>{
      if(res.result)
      message.success("删除成功")
      this.fetch()
    })

  }

  changeValue = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space>
            <Button
              size='small'
              shape='round'
              onClick={() => {
                this.setState({
                  departmentId: record.id,
                  visible: !visible
                })
              }}
            >修改</Button>
            <Popconfirm
              title={`确认将${record.name}删除吗?`}
              onConfirm={() => { this.delete({ "id": record.id}) }}
              okText="确认"
              cancelText="取消"
            >
              <Button
                type='danger'
                size='small'
                shape='round'
              >
                删除
            </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];
    const { dataSource, pageSize, _total, loading, visible } = this.state;
    return (
      <div>
        <Space direction="vertical" style={{padding:10}}>
        <Button
          type='dashed'
          style={{ marginLeft: 20}}
          onClick={() => {this.importDepartment()  }}
        >
          <PlusCircleOutlined />云端导入
        </Button>
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
          title="修改部门信息"
          visible={visible}
          onCancel={this.hideModal}
          footer={[
            <Button key='close' onClick={this.hideModal}>
              关闭
            </Button>
          ]}
        >
          <DepartmentEdit departmentId={this.state.departmentId} hideModal={this.hideModal}></DepartmentEdit>
        </Modal>
        </Space>
      </div>
    )
  }
}

export default DeparmentManager