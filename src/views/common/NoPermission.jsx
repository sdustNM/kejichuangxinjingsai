import React from 'react';
import { Row, Col, Card, Image } from 'antd'
import './NoPermission.css'
import abNormal from './abNormal.png'

const NoPermission = () => {
  return (<div className="np">

    <Card title="异常提醒" bordered={false}>
      <Row>
        <Col span="8">
          <Image src={abNormal} />
        </Col>
        <Col span="16">
          网页显示异常！（权限不足或已过期）
          </Col>

      </Row>
    </Card>

  </div>)
}

export default NoPermission;