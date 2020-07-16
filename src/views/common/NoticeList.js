import React from 'react'
import { Link } from 'react-router-dom'
import { List, Card, Typography } from 'antd'

import { FileTextOutlined } from '@ant-design/icons'
const { Text } = Typography
const icon = <FileTextOutlined style={{ fontSize: 24 }}></FileTextOutlined>

const data = [];
for (let i = 0; i < 23; i++) {
  data.push({
    id: i + 1,
    title: '关于教职工个人核对养老保险参保信息的通知' + i,
    avatar: icon,
    extra: <Text type="secondary">发布时间：(YYYY-MM-DD hh:mm:ss)</Text>
  });
}

class NoticeList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      noticeList: [],
      total: data.length,
      currentPage: 1,
      pageSize: 5
    }
  }

  componentDidMount() {
    this.refreshNoticeList(this.state.currentPage, this.state.pageSize);
  }

  refreshNoticeList = (currentPage, pageSize) => {
    this.setState({
      noticeList: data.slice(
        (currentPage - 1) * pageSize,
        Math.min(currentPage * pageSize, data.length))
    })
  }

  pageChange = (currentPage, pageSize) => {
    this.setState({
      currentPage,
      pageSize
    })
    this.refreshNoticeList(currentPage, pageSize);
  }


  render() {
    return (
      <div>
        <Card>
          <List
            itemLayout="horizontal"
            pagination={{
              pageSize: this.state.pageSize,
              pageSizeOptions: ['5', '10', '20', '50'],
              total: this.state.total,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: total => `共 ${total} 条`,
              onChange: this.pageChange,
              onShowSizeChange: this.pageChange,

            }}
            dataSource={this.state.noticeList}
            renderItem={item => (
              <Link key={item.id} to={'/notice/'+ item.id}>
                <List.Item
                  key={'item_'+item.id}
                  extra={item.extra}
                >
                  <List.Item.Meta
                    title={item.title}
                    avatar={item.avatar}
                  />
                </List.Item>
              </Link>
            )}

          />
        </Card>
      </div>
    )
  }
}


export default NoticeList;