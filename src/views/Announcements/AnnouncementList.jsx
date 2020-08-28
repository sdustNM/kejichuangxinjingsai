import React from 'react'
import { Card, Button } from 'antd'


class AnnouncementList extends React.Component {

  render() {
    const extra = (
      <Button
        type='primary'
        onClick={() => this.props.history.push('/administer/AnnouncementEdit')}
      >添加
      </Button>
    )
    return (
      <Card extra={extra}>

      </Card>
    )
  }
}

export default AnnouncementList