import React from 'react'
import { Table, Space, Button, Input,Modal } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { getExpertsByFuzzy } from '../../../services/administer/expert'
import ExpertManagerEdit from './ExpertManagerEdit';

class ExpertManagerList extends React.Component {
  state = {
    id: '',
    name: '',
    sfzh: '',
    dataSource: [],
    departmentList: [],
    currentPage: 1,
    pageSize: 5,
    loading: false,
    _total: 0,
    visible:false,
    expertId:''
  }

  componentDidMount() {
    this.fetch()
  }
  showModal = (id) => {
    this.setState({
      visible: true,
      expertId:id
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    })
    this.fetch()
  }
  
  fetch = () => {
    const { id, name, sfzh, currentPage, pageSize } = this.state
    console.log(this.state)
    getExpertsByFuzzy({
      id,
      name,
      sfzh,
      currentPage,
      pageSize
    }).then(res => {
      console.log(res)
      if (res.data.result) {
        let list = []
        let data = JSON.parse(res.data.data)
        data.list.map(item =>
          list.push({
            id: item.id,
            key: item.id,
            name: item.name,
            gender: item.gender,
            sfzh: item.sfzh,
            unit: item.unit,
            tel1: item.Tel1,
            tel2: item.Tel2
          })
        )
        console.log("wchere")
        console.log(data)
        this.setState({
          departmentList: data.departmentList,
          dataSource: list,
          _total: data.totalNum
        })
      }

    })
  }
  pageChange = (currentPage, pageSize) => {
    this.setState({
      currentPage,
      pageSize
    })
    this.fetch();
  }
  showSizeChange = (current, pageSize) => {

    this.setState({
      current: 1,
      pageSize
    })
    this.fetch();
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
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: '身份证号',
        dataIndex: 'sfzh',
        key: 'sfzh',
      },
      {
        title: '单位',
        key: 'unit',
        dataIndex: 'unit',
      },
      {
        title: '联系电话1',
        key: 'tel1',
        dataIndex: 'tel1',
      },
      {
        title: '联系电话2',
        key: 'tel2',
        dataIndex: 'tel2',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space>
            <Button
              type='primary'
              size='small'
              shape='round'
              onClick={() => {
               this.showModal(record.id)
              }}
            >修改</Button>
            <Button
              type='danger'
              size='small'
              shape='round'
            >删除</Button>
          </Space>
        ),
      },
    ];
    const { id, name, sfzh, dataSource, pageSize, _total, loading,visible } = this.state;
    return (
      <div>

        <Space
          style={{ margin: 20 }}
        >
          <Input addonBefore='编号' name='id' value={id} onChange={this.changeValue} />
          <Input addonBefore='姓名' name='name' value={name} onChange={this.changeValue} />
          <Input addonBefore='身份证号' name='sfzh' value={sfzh} onChange={this.changeValue} />
          <Button type='primary' onClick={this.fetch}>搜索</Button>
        </Space>
        <Button
          type='dashed'
          style={{ marginLeft: 20 }}
          onClick={this.fetch}
        >
          <PlusCircleOutlined />添加
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
          scroll={{ y: 320 }}
        />
        <Modal
          width={600}
          title="修改专家信息"
          visible={visible}
          onCancel={this.hideModal}
          destroyOnClose={true}
          footer={[
            <Button key='close' onClick={this.hideModal}>
              关闭
            </Button>
          ]}
        >
          <ExpertManagerEdit id={this.state.expertId} hideModal={this.hideModal}></ExpertManagerEdit>
        </Modal>
      </div>
    )
  }
}

export default ExpertManagerList