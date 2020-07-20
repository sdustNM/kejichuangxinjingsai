import React from 'react'
import { List } from 'antd'

class AppendixList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      fileList: []
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(!nextProps.fileList) return null
    return {
      fileList: nextProps.fileList
    }
  }
  render(){
    return (
      <List
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
          />
    )
  }
}

export default AppendixList