import React from 'react'
import { Card, Button, List, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { getNewsList } from '../../services/news'

const { Text } = Typography

class AnnouncementList extends React.Component {

  state = {
    announcements: []
  }

  getAnnouncements = async () => {
    const res = await getNewsList()
    console.log(JSON.parse(res.data))
    if (res.result) {
      const announcements = JSON.parse(res.data).map(item => {
        return {
          id: item.Id,
          title: item.Title,
          time: item.CreateTime
        }
      })
      this.setState({ announcements })
    }
  }

  componentDidMount() {
    this.getAnnouncements()
  }

  render() {
    console.log(this.state.announcements)
    const extra = (
      <Button
        type='primary'
        onClick={() => this.props.history.push({ pathname: '/administer/AnnouncementEdit', state: {} })}
      >添加
      </Button>
    )
    return (
      <Card title='通知公告' extra={extra}>
        <List
          bordered
          dataSource={this.state.announcements}
          renderItem={item => (
            <List.Item>
              <Link key={'news_key_' + item.id} to={{ pathname: '/administer/AnnouncementEdit', state: { id: item.id } }}>
                <List.Item
                  key={'item_' + item.id}
                  extra={item.extra}
                >
                  <List.Item.Meta
                    title={item.title}
                    avatar={<Text type="secondary">发布时间：(YYYY-MM-DD hh:mm:ss)</Text>}
                  />
                </List.Item>
              </Link>
            </List.Item>
          )}
        />
      </Card>
    )
  }
}

export default AnnouncementList