import React from 'react';
import { Layout, Row, Col } from 'antd'
import MyHeader from './header';
import AnnouncementList from './announcementList';
import PublicityList from './publicityList.jsx';
import XiaoCompetitonList from './xiao-competitonList';
import YuanCompetitonList from './yuan-competitonList';

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <Layout>
        <Header style={{ backgroundColor: '#1890ff' }}>
          <MyHeader />
        </Header>
        <Content>
          <Row>
            <Col offset={1} span={10}>
              <AnnouncementList />
              <PublicityList />
            </Col>
            <Col offset={1} span={10}>
              <XiaoCompetitonList />
              <YuanCompetitonList />
            </Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default Home;