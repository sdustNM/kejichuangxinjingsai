import React, { Component } from 'react'
import { Card, Table, Button, Modal } from 'antd'
import { getNeedReviewList } from '../../../../services/Achievements/competitionName'
import ReviewRealCompetitionName from './ReviewRealCompetitionName'


export default class ReviewRealCompetitionNameList extends Component {
  state = {
    dataSource: [],
    loading: false,
    isModalVisible: false,
    record: {}
  }

  async componentDidMount() {
    const dataSource = await this.getData()
    //console.log(dataSource)
    this.setState({ dataSource })
  }

  getData = async () => {
    const res = await getNeedReviewList()
    if (res.result) {
      return JSON.parse(res.data)
    }
  }

  checkDetail = record => {
    this.setState({
      record,
      isModalVisible: true
    })
  }
  handleCancel = async () => {
    const dataSource = await this.getData()
    this.setState({
      dataSource,
      record: {},
      isModalVisible: false
    })
  }

  render() {
    const { dataSource, loading, isModalVisible, record } = this.state
    const columns = [
      {
        title: '实际名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '类别',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: '级别',
        dataIndex: 'comLevel',
        key: 'comLevel'
      },
      {
        title: '年份',
        dataIndex: 'batch',
        key: 'batch'
      },
      {
        title: '届数',
        dataIndex: 'sessionNumber',
        key: 'sessionNumber'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Button
            type='primary'
            //size='small'
            //shape='round'
            onClick={() => this.checkDetail(record)}
          >查看</Button>
        ),
      },
    ]

    return (
      <>
        <Card>
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey={record => record.id}
            pagination={{
              position: ['topRight', 'bottomRight']
            }}
            loading={loading}
          />
        </Card>
        <Modal
          width={800}
          title="竞赛名称申请详情"
          visible={isModalVisible}
          maskClosable={false}
          destroyOnClose={true}
          onCancel={this.handleCancel}
          footer={null}
        >
          <ReviewRealCompetitionName record={record} closeModal={this.handleCancel} />
        </Modal>
      </>

    )
  }
}
