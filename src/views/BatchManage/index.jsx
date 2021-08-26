import React from 'react'
import { Table, Space, Button, Modal, Popconfirm, Tag } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import { getBatchList } from '../../services/Achievements/batchApi'
import ExpertManagerEdit from './ExpertManagerEdit';
import { CheckCircleTwoTone } from '@ant-design/icons';

const initBatches = [
  { id: 1, batchName: '2020一批次', fileTime: '2020-06-30', isValid: false },
  { id: 2, batchName: '2020二批次', fileTime: '2020-12-31', isValid: true },
  { id: 3, batchName: '2021第一批次', fileTime: '2021-12-31', isValid: false }]
class BatchManager extends React.Component {
  state = {
    batches: [],
    //currentPage: 1,
    //pageSize: 10,
    loading: false,
    //_total: 0,
    visible: false,
    batchID: null
  }

  componentDidMount() {
    this.getBatches()
  }
  showModal = batchID => {
    this.setState({
      visible: true,
      batchID
    });
  };

  hideModal = () => {
    this.setState({
      batchID: null,
      visible: false
    })
    this.getBatches()
  }

  getBatches = async () => {
    this.setState({ loading: true });
    // const res = await getBatchList({})
    // //console.log(res)
    // let batches = []
    // if (res.result) {
    //   //console.log(res)
    //   batches = JSON.parse(res.data)
    // }
    this.setState({ batches: initBatches, loading: false })
  }

  del = id => {
    alert("delete", id)
    // delExpert({ "id": expertID }).then(
    //   res => {
    //     if (res.result) {
    //       message.success('删除成功！', 1)
    //       this.refresh()
    //     }
    //     else {
    //       message.error(res.message, 1)
    //     }
    //   }
    // )
  }
  setCurrent = id => {
    alert("setCurrent", id)
  }

  render() {
    const columns = [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      //   key: 'id'
      // },
      {
        title: '批次名称',
        dataIndex: 'batchName',
        key: 'batchName'
      },
      {
        title: '归档日期',
        dataIndex: 'fileTime',
        key: 'fileTime',
      },
      {
        title: '是否当前批次',
        dataIndex: 'isValid',
        key: 'isValid',
        render: isValid => isValid && <Tag color='geekblue'>当前批次</Tag>
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space>
            <Button
              //type='default'
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
            {record.isValid || (
              <Popconfirm
                title={`确认将${record.name}设置为当前批次吗?`}
                onConfirm={() => { this.setCurrent(record.id) }}
                okText="确认"
                cancelText="取消"
              >
                <Button
                  type='primary'
                  size='small'
                  shape='round'
                >
                  删除
                </Button>
              </Popconfirm>
            )}

          </Space>
        ),
      },
    ];
    const { batches, loading, visible, batchID } = this.state;

    const batch = batchID ? batches.find(item => item.id === batchID) : {}
    console.log(batch)
    return (
      <div>

        <Space
          style={{ margin: 20 }}
        >
          <Button
            type='dashed'
            onClick={() => { this.showModal() }}
          >
            <PlusCircleOutlined />添加
          </Button>
        </Space>

        <Table
          dataSource={batches}
          columns={columns}
          rowKey={record => record.id}
          pagination={{
            position: ['topRight', 'bottomRight']
          }}
          loading={loading}
        //scroll={{ y: 320 }}
        />
        <Modal
          width={600}
          title={batchID ? "修改批次信息" : "添加批次信息"}
          visible={visible}
          onCancel={this.hideModal}
          destroyOnClose={true}
          footer={[
            <Button key='close' onClick={this.hideModal}>
              关闭
            </Button>
          ]}
        >
          <ul>
            <li>{batch.id}</li>
            <li>{batch.batchName}</li>
            <li>{batch.fileTime}</li>
            <li>{batch.isValid}</li>
          </ul>
        </Modal>
      </div>
    )
  }
}

export default BatchManager