import React, { Component } from 'react'
import { List } from 'antd'
import { appRoot } from '../../utils/request'

class AppendixList extends Component {
    render() {
        const fileList = this.props.fileList
        return (
            <List
                size="small"
                //bordered
                dataSource={fileList}
                renderItem={item => (
                    <List.Item>
                        <a
                            href={appRoot + item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.name}
                        </a>
                    </List.Item>)}
            />
        )
    }
}

export default AppendixList