import React from 'react';
import { Table, Space, Button ,AutoComplete,Row } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'

const data = []
for (let i = 1; i <= 46; i++) {
  data.push({
    id: i,
    key: i,
    name: '比赛' + i,
    department: '测试部门',
    type: i % 2 === 0 ? '学校海选' : '学校晋级',
    state: '待定'
  })
}
const options = [
  {
    value: '能源学院',
  },
  {
    value: '安全学院',
  },
  {
    value: '计算机学院',
  },
]; 

class CompetitionManagerYuan extends React.Component {

  state = {
    dataSource: [],
    total: data.length,
    currentPage: 1,
    pageSize: 5,
    loading: false
  }

  componentDidMount() {
    this.refresh(this.state.currentPage, this.state.pageSize);
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
      current: 1,
      pageSize
    })
    this.refresh(1, pageSize);
  }

  refresh = (currentPage, pageSize) => {
    this.setState({
      dataSource: data.slice(
        (currentPage - 1) * pageSize,
        Math.min(currentPage * pageSize, data.length))
    })
  }

  render() {
    const Complete = () => (
      <AutoComplete
        style={{
          width: 200,
          padding:20,
        }}
        options={options}
        placeholder="try to type `b`"
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
    );

    const columns = [
      {
        title: '比赛编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '比赛名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '组织单位',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '比赛类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '比赛状态',
        key: 'state',
        dataIndex: 'state',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <Button
              type='primary'
              size='small'
              shape='round'
              onClick={() => {
                this.props.history.push({ pathname: '/administer/competitionEdit', state: { id: record.key } })
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
    const { dataSource, pageSize, total, loading } = this.state;
    return (
      <div>
        <Row  align="middle">
        <span style={{paddingLeft:20}}>学院</span> <Complete />   
        <Button
          type='dashed'
         
          onClick={() => { this.props.history.push({ pathname: '/administer/competitionEdit' }) }}
        >
          <PlusCircleOutlined />添加
        </Button>
        </Row>
        <Table
          dataSource={dataSource}
          columns={columns}   
          pagination={{
            pageSize: pageSize,
            pageSizeOptions: ['5', '10', '20', '50'],
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 条`,
            onChange: this.pageChange,
            onShowSizeChange: this.showSizeChange,
          }}
          loading={loading}
          scroll={{ y: 320 }}
        />
      </div>
    )
  }
}

export default CompetitionManagerYuan;