import React from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { appRoot } from '../../utils/request'
import { getJwt } from '../../utils/jwtHelper'
import { deleteProjectFile } from '../../services/project'

class AppendixUpload extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.projectID,
      type: props.fileType,
      maxNum: props.maxNum,
      fileList: null
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.fileList != null) return null
    let fileList = []
    if (nextProps.fileList) {
      fileList = nextProps.fileList.map(file => {
        file.uid = nextProps.projectID + '_' + file.id;
        file.url = appRoot + file.url
        return file;
      })
    }
    return {
      fileList,
      id: nextProps.projectID
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if(!nextProps.fileList) return
  //   const fileList = nextProps.fileList.map(file => {
  //     file.uid = this.props.projectID + '_' + file.id;
  //     file.url = appRoot + file.url
  //     return file;
  //   })
  //   this.setState({ fileList })
  // }
  beforeUpload = (file, fileList) => {
    console.log(this.state.fileList, this.state.maxNum)
    if (this.state.fileList.length >= this.state.maxNum) {
      message.warning('上传附件个数不能超过' + this.state.maxNum)
      return false
    }
    return true
  }

  handleChange = info => {
    console.log(info)
    let fileList = [...info.fileList];

    if (fileList.length > this.state.maxNum) {
      fileList = fileList.slice(0, this.state.maxNum)
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
      if (res.data.result) {
        message.success('服务器端删除成功！')
        //console.log(file.id, this.state.fileList)
        const fileList = this.state.fileList.filter(item => item.id !== file.id)
        this.setState({ fileList })
      }
    })
  }
  render() {
    const { id, type } = this.state
    const props = {
      action: appRoot + '/api/Appendix/UploadProjectFile',
      data: { id: id, FileType: type },
      headers: {
        authorization: getJwt(),
      },
      disabled: !id,
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