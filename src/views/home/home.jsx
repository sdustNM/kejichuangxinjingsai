import React from 'react';
import { Layout, Row, Col } from 'antd'
import MyHeader from './header';
import AnnouncementList from './announcementList';
import PublicityList from './publicityList.jsx';
import XiaoCompetitonList from './xiao-competitonList';
import YuanCompetitonList from './yuan-competitonList';
import HomeCarousel from './Carousel'
const { Header, Content } = Layout;

class Home extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {

    }
  }

  render() {
    return (
      <Layout>
        <Header style={{ backgroundColor: '#1890ff' }}>
          <MyHeader />
        </Header>
        <Content style={{ backgroundColor: 'white', padding: '0 20px'}}>
          <HomeCarousel />
          <Row >
            <Col offset={1} span={12}>
              <AnnouncementList />
              <PublicityList />
            </Col>
            <Col offset={1} span={8}>
              <XiaoCompetitonList />
              <YuanCompetitonList />
            </Col>
          </Row>
        </Content>
      </Layout>
      
    );
  }
}

export default Home;