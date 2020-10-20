import React from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { appRoot } from '../../../utils/request'
import { getJwt } from '../../../utils/jwtHelper'
import { deleteProjectFile } from '../../../services/project'

class ProjectAppendixUpload extends React.Component {
  constructor(...props) {
    super(...props)   
    this.state = { 
      fileList: []
    }
  }

  componentDidMount() {
    //拉取服务器端已上传的附件
    this.getFileList()
  }

  getFileList = () => {
    if(!this.props.appendixList) return
    const fileList = this.props.appendixList.map(file => {
      file.uid = file.id;
      file.rawUrl = file.url
      file.url = appRoot + file.url
      return file;
    });
    this.setState({ fileList })
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

    fileList = fileList.slice(0,this.props.maxNum).map(file => {
      if (file.response) {
        let data = JSON.parse(file.response.data)
        file.rawUrl = data.url
        file.url = appRoot + data.url
        file.id = data.id
      }
      return file;
    });

    //console.log(fileList)
    this.setState({ fileList });
  }

  handleRemove = file => {
    deleteProjectFile({ id: file.id }).then(res => {
      if (res.result) {
        //console.log(res.result)
        message.success('附件“' + file.name + '”删除成功！')
      }
      else{
        message.warning('附件“' + file.name + '”删除失败！')
      }
    })
  }

  getAppendixUrls = () => {
    //console.log(this.state.fileList)
    return this.state.fileList.reduce( (pre, item) => {
      return pre ? pre + ',' + item.rawUrl : item.rawUrl
    }, null)
  }

  render() {
    //console.log(this.props)
    const props = {
      action: appRoot + '/api/Appendix/UploadProjectFile',
      data: { FileType: this.props.fileType },
      headers: {
        authorization: getJwt(),
      },
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

export default ProjectAppendixUpload