import React from 'react'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getJwt } from '../../utils/jwtHelper'
import { getCompetitionFilesByComId, deleteCompetitionFile } from '../../services/administer/appendix'
import { appRoot } from '../../utils/request'

class CompetitionEditAppendix extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      fileList: []
    }
  }

  componentDidMount() {
    //拉取服务器端已上传的附件
    this.getFileList()
  }

  getFileList = () => {
    getCompetitionFilesByComId({ comId: this.props.id }).then(res => {
      if (res.data.result) {

        const fileList = JSON.parse(res.data.data).map(file => {
          file.uid = this.props.id + '_' + file.id;
          file.url = appRoot + file.url
          return file;
        });

        //console.log(fileList)
        this.setState({ fileList })
      }
    })
  }

  handleChange = info => {
    console.log(info)
    let fileList = [...info.fileList];

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
    deleteCompetitionFile({ id: file.id }).then(res => {
      if (res.data.result) {
        console.log(res.data.result)
        //console.log(fileList)
      }
    })
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
          <UploadOutlined /> Upload
    </Button>
      </Upload>
    )
  }
}

export default CompetitionEditAppendix