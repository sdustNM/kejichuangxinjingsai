import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichTextEditor extends Component {

  static propTypes = {
    content: PropTypes.string
  }

  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = editorState => {
    this.setState ({
      editorState,
    })
  }

  getContent = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

  componentDidMount(){
    const htmlContent = this.props.content;
    //const htmlContent = "<p><del><strong>你好</strong></del><sup><strong>👻</strong></sup></p><p></p><p><ins>哈哈哈哈</ins></p>"
    if(!htmlContent) return
    const contentBlock = htmlToDraft(htmlContent);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState ({
        editorState,
      })
    }
  }
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{height: 500, border: '1px solid rgba(0,0,0,0.25)', padding: 10}}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}