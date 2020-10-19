import React from 'react'
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getJwt } from '../../utils/jwtHelper'
import { deleteCompetitionFile } from '../../services/administer/appendix'
import { appRoot } from '../../utils/request'

class CompetitionEditAppendix extends React.Component {

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
    console.log(this.props)
    if(!this.props.appendixList) return
    const fileList = this.props.appendixList.map(file => {
      file.uid = this.props.id + '_' + file.id;
      file.rawUrl = file.url
      file.url = appRoot + file.url
      return file;
    });

    console.log(fileList)
    this.setState({ fileList })
  }

  handleChange = info => {
    console.log(info)
    let fileList = [...info.fileList];

    fileList = fileList.map(file => {
      if (file.response) {
        let data = JSON.parse(file.response.data)
        file.rawUrl = data.url
        file.url = appRoot + data.url
        file.id = data.id
      }
      return file;
    });

    this.setState({ fileList });
  }

  handleRemove = file => {
    deleteCompetitionFile({ id: file.id }).then(res => {
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
    console.log(this.state.fileList)
    return this.state.fileList.reduce( (pre, item) => {
      return pre ? pre + ',' + item.rawUrl : item.rawUrl
    }, null)
  }

  render() {
    const props = {
      action: 'http://192.168.34.201:4000/api/Appendix/UploadCompetitionFile',
      data: { id: this.props.id },
      headers: {
        authorization: getJwt(),
      },
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

export default CompetitionEditAppendix