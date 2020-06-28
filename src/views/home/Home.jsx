import React from 'react'
import { Row, Col, Card } from 'antd'
import banner from './banner.png'
import { ContactsTwoTone } from '@ant-design/icons'
import './home.css'
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
      <div style={bgStyle} className="bg">
          
          <Row justify="center" gutter={[16,80]} align="middle" style={{minHeight:'100vh'}}>
            <Col span={4}>
              <Card
                style={{
                  backgroundColor: '#ffffff',
                  opacity: 0.6
                }}
                onClick = {() => this.props.history.push({pathname:'/login',state:{entryID: 3}})}
                hoverable
                cover={<ContactsTwoTone twoToneColor='#52c41a' style={{ fontSize: 84 }} />}
              >
                <Meta
                  title={<h4 style={{ color: '#52c41a', fontWeight: 'bold' }}>参赛入口</h4>}
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
                onClick = {() => this.props.history.push({pathname:'/login',state:{entryID: 2}})}
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
                onClick = {() => this.props.history.push({pathname:'/login',state:{entryID: 1}})}
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
    )
  }
}