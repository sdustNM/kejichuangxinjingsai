import React from 'react'
import { Table, Space, Button, Input, Modal,Popconfirm,message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
//import { CheckCircleTwoTone  } from '@ant-design/icons';
import { delDDCompetitionById,getDDCompetitionListByFuzzy } from '../../../services/Achievements/ddOperation';
import DDCompetitionEdit from './DDCompetitionEdit';

class DDCompetitionList extends React.Component {
  state = {
    id: '',
    name: '',
    dataSource: [],
    currentPage: 1,
    pageSize: 5,
    loading: false,
    _total: 0,
    visible: false,
    mid:'', //modal用的
  }

  componentDidMount() {
    this.refresh(this.state.currentPage, this.state.pageSize)
  }
  showModal = (id) => {
    this.setState({
      visible: true,
      mid: id
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    })
    this.refresh(this.state.currentPage, this.state.pageSize)
  }

  pageChange = (currentPage, pageSize) => {
    this.setState({
      currentPage,
      pageSize
    })
    this.refresh(currentPage, pageSize);
  }
  showSizeChange = (current, pageSize) => {

    this.setState({
      currentPage: 1,
      pageSize
    })
    this.refresh(1, pageSize);
  }

  search = () => {
    this.setState({
      currentPage: 0,
    })
    this.refresh(0, this.state.pageSize)
  }

  refresh = (currentPage, pageSize) => {
    const { id, name } = this.state
    //console.log(this.state)
    if (!currentPage) currentPage=this.state.currentPage
    if (!pageSize) pageSize=this.state.pageSize
    getDDCompetitionListByFuzzy({
      id,
      name,
      currentPage,
      pageSize
    }).then(res => {
      //console.log(res)
      if (res.result) {
        let list = []
        let data = JSON.parse(res.data)
        data.map(item =>
          list.push({
            id: item.Id,
            key: item.Id,
            name: item.Name,
            type:item.Type,
            sortid:item.Sortid
          })
        )
        this.setState({
          dataSource: list,
          _total: data.totalNum
        })
      }

    })
  }

  
  del = id => {
    delDDCompetitionById({"id":id}).then(
      res => {
        if(res.result){
          message.success('删除成功！', 1)
          this.refresh()
        }
        else{
          message.error(res.message, 1)
        }
      }
    )
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
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '排序',
        dataIndex: 'sortid',
        key: 'sortid',
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
            <Popconfirm
              title={`确认将${record.name}删除吗?`}
              onConfirm={() => { this.del(record.id) }}
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
    const { id, name, sfzh, dataSource, pageSize, _total, loading, visible } = this.state;
    return (
      <div>

        <Space
          style={{ margin: 20 }}
        >
          <Input addonBefore='编号' name='id'  onChange={this.changeValue} />
          <Input addonBefore='名称' name='name'  onChange={this.changeValue} />
          <Button type='primary' onClick={this.search}>搜索</Button>
          <Button
          
          style={{ marginLeft: 20 }}
          onClick={() => { this.showModal() }}
        >
          <PlusCircleOutlined />添加
        </Button>
 
        </Space>
       
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
        //scroll={{ y: 320 }}
        />
        <Modal
          width={600}
          title={this.state.id?"修改比赛信息":"添加比赛信息"}
          visible={visible}
          onCancel={this.hideModal}
          destroyOnClose={true}
          footer={[
            <Button key='close' onClick={this.hideModal}>
              关闭
            </Button>
          ]}
        >
          <DDCompetitionEdit id={this.state.mid} hideModal={this.hideModal}></DDCompetitionEdit>
        </Modal>
      </div>
    )
  }
}

export default DDCompetitionList