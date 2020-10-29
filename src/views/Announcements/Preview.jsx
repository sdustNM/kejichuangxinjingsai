import React from 'react'
import { Typography } from 'antd';

const { Title } = Typography;

class Preview extends React.Component {

  // state = {
  //   title: this.props.title,
  //   picUrl: this.props.picUrl,
  //   content: this.props.content,
  // }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { title, picUrl, content } = nextProps;
  //   // 当传入的type发生变化的时候，更新state
  //   if (title !== prevState.title || picUrl !== prevState.picUrl || content !== prevState.content) {
  //     return {
  //       title,
  //       picUrl,
  //       content
  //     };
  //   }
  //   // 否则，对于state不进行任何操作
  //   return null;
  // }

  render() {
    const { title, content } = this.props
    return (
      <div>
        <Title level={2}>{title}</Title>
        <div dangerouslySetInnerHTML={{ __html: content }} ></div>
      </div>
    )
  }
}

export default Preview