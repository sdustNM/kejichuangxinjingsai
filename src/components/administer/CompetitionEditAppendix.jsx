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

  handleChange = (file, fileList) => {
    console.log(file, fileList)
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    this.setState({fileList})
  }

  render() {
    const props = {
      action: '',
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