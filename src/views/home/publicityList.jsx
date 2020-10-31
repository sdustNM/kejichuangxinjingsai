import React from 'react';
import { Card, List, Button } from 'antd'
import { DoubleRightOutlined } from '@ant-design/icons'

import { getNewsList } from '../../services/news'

class PublicityList extends React.Component {
  constructor(...props) {
    super(...props);

    this.state = {
      data: []
    };
  }

  getData = async () => {
    const result = await getNewsList()
    console.log(result)
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const title = <h3 style={{ fontWeight: 'bold' }}>比赛公示</h3>
      const extra = (
        <Button type='link'>
          <span>更多</span>
          <DoubleRightOutlined />
        </Button>
      )
      return (
        <Card
          title={title}
          bordered={false}
          extra={extra}>
          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item>
                {item.title}
              </List.Item>
            )} />
        </Card>
      )
  }
}

export default PublicityList;