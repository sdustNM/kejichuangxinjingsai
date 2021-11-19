import React, { Component } from 'react'
import { Card, Table, Button, Modal, Space, Input } from 'antd'
import { getNeedReviewList } from '../../../../services/Achievements/competitionName'
import ReviewRealCompetitionName from './ReviewRealCompetitionName'


export default class ReviewRealCompetitionNameList extends Component {
  state = {
    dataSource: [],
    loading: false,
    isModalVisible: false,
    realName: '',
    record: {}
  }

  async componentDidMount() {
    this.refresh()
  }

  refresh = async () => {
    this.setState({ loading: true })

    const res = await getNeedReviewList({fuzzyName: this.state.realName})
    if (res.result) {
      const dataSource = JSON.parse(res.data)
      console.log(dataSource)
      this.setState({ dataSource, loading: false })
    }

  }

  // getData = async () => {
  //   const res = await getNeedReviewList()
  //   if (res.result) {
  //     return JSON.parse(res.data)
  //   }
  // }

  checkDetail = async id => {
    const res = await getNeedReviewList({ id })
    if (res.result) {
      const record = JSON.parse(res.data)
      console.log(record)
      this.setState({
        record,
        isModalVisible: true
      })
    }
  }

  //搜索框内容更改
  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  //清空搜索框
  reset = () => {
    this.setState({ realName: '' }, this.refresh)
  }

  handleCancel = async () => {
    this.setState({
      record: {},
      isModalVisible: false
    }, this.refresh)
  }

  render() {
    const { dataSource, loading, isModalVisible, record, realName } = this.state
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
            onClick={() => this.checkDetail(record.id)}
          >查看</Button>
        ),
      },
    ]

    const title =
      <Space>
        <Input addonBefore='比赛名称' name='realName' onPressEnter={this.refresh} value={realName} onChange={this.changeValue} />
        <Button type='primary' onClick={this.refresh}>搜索</Button>
        <Button type='primary' onClick={this.reset}>重置</Button>
      </Space>

    return (
      <>
        <Card title={title}>
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
