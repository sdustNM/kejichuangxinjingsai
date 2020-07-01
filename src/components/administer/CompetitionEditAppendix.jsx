import React from 'react'
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



class CompetitionEditAppendix extends React.Component {

  constructor(props){
    super(props)
    this.state= {
      fileList: []
    }
  }

  componentDidMount(){
    //拉取服务器端已上传的附件
    
  }

  handleChange = info => {
    console.log(info.file.status)
    let fileList = [...info.fileList];
    console.log(fileList)
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
     this.setState({fileList})
  }

  render() {
    const props = {
      action: '',
      data: {id: this.props.id},
      onChange: this.handleChange,
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