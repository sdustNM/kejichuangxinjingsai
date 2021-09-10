import React, { Component } from 'react'
import { List, Tooltip, Image } from 'antd'
import { appRoot } from '../../utils/request'

class AppendixList extends Component {
    render() {
        const fileList = this.props.fileList
        // const title = <Image
        //     width={200}
        //     src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        // />
        return (
            <List
                bordered={this.props.bordered}
                size="small"
                //bordered
                dataSource={fileList}
                renderItem={item => (
                    <List.Item>
                        <Tooltip title={
                            <Image
                                placement='topRight'
                                width={600}
                                src={appRoot + item.url}
                            />
                        }>
                            <a
                                href={appRoot + item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.name}
                            </a>
                        </Tooltip>
                    </List.Item>)}
            />
        )
    }
}

export default AppendixList