import React from 'react'
import { List } from 'antd'
import { appRoot } from '../../utils/request'
class AppendixList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.fileList) return null
    return {
      fileList: nextProps.fileList
    }
  }
  render() {
    return (
      this.state.fileList &&  this.state.fileList.length > 0 ?
      (<List
        size="small"
        //bordered
        dataSource={this.state.fileList}
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
      />) : '无'
    )
  }
}

export default AppendixList