import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, DatePicker,Tabs } from 'antd';
import { AppleOutlined,AndroidOutlined,ContainerOutlined } from '@ant-design/icons'

const { TabPane } = Tabs;

class ConfirmAchieveList extends Component {
    constructor(...props) {
        super(...props)
        this.state = {
            id: props[0].location.state && props[0].location.state.projectID,
           // userID: getUserID(),
           // userName: getUserName(),
        }
        this.formRef = React.createRef();
    }

    async componentDidMount() {
        const { id } = this.state
        this.setState({
        })
    }

    render() {
        const { id} = this.state
        return (
            <div style={{padding:24}}>
            <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <ContainerOutlined />
                  论文
                </span>
              }
              key="1"
            >
              Tab 1
            </TabPane>
            <TabPane
              tab={
                <span>
                  <AndroidOutlined />
                  Tab 2
                </span>
              }
              key="2"
            >
              Tab 2
            </TabPane>
          </Tabs>
          </div>
        )
    }
}

export default ConfirmAchieveList
