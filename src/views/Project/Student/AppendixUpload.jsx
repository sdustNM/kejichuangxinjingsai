import React from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { appRoot } from '../../../utils/request'
import { getJwt } from '../../../utils/jwtHelper'
import { deleteProjectFile } from '../../../services/project'

class AppendixUpload extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      defaultLength: 0,
      fileList: []
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    //console.log(nextProps.fileList.length, prevState.defaultLength)
    if(nextProps.fileList.length == prevState.defaultLength) return null

    let fileList = []
    if (nextProps.fileList) {
      fileList = nextProps.fileList.map(file => {
        file.uid = nextProps.projectID + '_' + file.id;
        file.url = appRoot + file.url
        return file;
      })
    }
    return({
      fileList,
      defaultLength: nextProps.fileList.length
    })
  }

  beforeUpload = (file, fileList) => {
    //console.log(this.state.fileList, this.state.maxNum)
    if (this.state.fileList.length >= this.props.maxNum) {
      message.warning('上传附件个数不能超过' + this.props.maxNum)
      return false
    }
    return true
  }

  handleChange = info => {
    //console.log(info)
    let fileList = [...info.fileList];

    if (fileList.length > this.props.maxNum) {
      fileList = fileList.slice(0, this.props.maxNum)
    }
    fileList = fileList.map(file => {
      if (file.response) {
        let data = JSON.parse(file.response.data)
        file.url = appRoot + data.url
        file.id = data.id
      }
      return file;
    });
    this.setState({ fileList });
  }

  handleRemove = file => {
    if (file.status === 'error') return
    deleteProjectFile({ id: file.id }).then(res => {
      if (res.result) {
        message.success('服务器端删除成功！')
        //console.log(file.id, this.state.fileList)
        const fileList = this.state.fileList.filter(item => item.id !== file.id)
        this.setState({ fileList })
      }
    })
  }
  render() {
    //console.log(this.props)
    const props = {
      action: appRoot + '/api/Appendix/UploadProjectFile',
      data: { id: this.props.projectID, FileType: this.props.fileType },
      headers: {
        authorization: getJwt(),
      },
      disabled: !this.props.projectID,
      beforeUpload: this.beforeUpload,
      onChange: this.handleChange,
      onRemove: this.handleRemove,
      fileList: this.state.fileList
    }
    return (
      <Upload {...props}>
        <Button>
          <UploadOutlined />
          Upload
        </Button>
      </Upload>
    )
  }
}

export default AppendixUpload