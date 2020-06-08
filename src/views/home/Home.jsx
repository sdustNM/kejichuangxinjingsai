import React from 'react'
import { Row, Col, Card } from 'antd'
import banner from './banner.png'
import { ContactsTwoTone } from '@ant-design/icons'
const { Meta } = Card;


const bgStyle = {
  width: '100%',
  height: '100%',
  background: `url(${banner}) no-repeat center center fixed`,
  backgroundSize: 'cover',
}
export default class Home extends React.Component {

  render() {
    return (
      <div style={bgStyle}>
        <div
          className="site-card-wrapper"
          style={{
            top:300,
            left:50
          }}>
          <Row justify="start" gutter={16}>
            <Col span={4}>
              <Card
                style={{
                  backgroundColor: '#ffffff',
                  opacity: 0.6
                }}
                hoverable
                cover={<ContactsTwoTone twoToneColor='#52c41a' style={{ fontSize: 84 }} />}
              >
                <Meta
                  title={<h4 style={{ color: '#52c41a', fontWeight: 'bold' }}>学生入口</h4>}
                  style={{
                    textAlign: 'center'
                  }} />
              </Card>
            </Col>
            <Col span={4}>
              <Card
                style={{
                  backgroundColor: '#ffffff',
                  opacity: 0.6
                }}
                hoverable
                cover={<ContactsTwoTone twoToneColor='#096dd9' style={{ fontSize: 84 }} />}
              >
                <Meta
                  title={<h4 style={{ color: '#096dd9', fontWeight: 'bold' }}>评审入口</h4>}
                  style={{
                    textAlign: 'center'
                  }} />
              </Card>
            </Col>
            <Col span={4}>
              <Card
                style={{
                  backgroundColor: '#ffffff',
                  opacity: 0.6
                }}
                hoverable
                cover={<ContactsTwoTone twoToneColor='#faad14' style={{ fontSize: 84 }} />}
              >
                <Meta
                  title={<h4 style={{ color: '#faad14', fontWeight: 'bold' }}>管理入口</h4>}
                  style={{
                    textAlign: 'center'
                  }} />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}