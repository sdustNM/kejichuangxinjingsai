import React from 'react'
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types'


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  static propTypes = {
    picture: PropTypes.string
  }

  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  getPicture = () => this.state.fileList[0].url

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ file, fileList }) => {
    console.log(file, fileList)
    if (file.status === 'done') {
      file = fileList[fileList.length - 1]
      const { name, url } = file.response
      file.name = name
      file.rawUrl = url
      file.url = url
    }
    this.setState({ fileList });
  }

  handleRemove = file => {
    console.log(file)
    
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          //action={appRoot + 'xxx'}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          name='image'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall