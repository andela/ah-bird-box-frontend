import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import {
  Form, Divider
} from 'semantic-ui-react';
import { createArticle } from '../../actions/articlesActions';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './articles.scss';

class createArticleView extends Component {
  constructor(props) {
    super(props);
    const state = this.props;
    this.state = {
      ...state,
      tags: [],
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount = () => {
    document.querySelector('.create-article').style.display = 'none';
  }

  componentDidUpdate() {
    const { articles, history } = this.props;
    if (articles) {
      if (articles.success) {
        history.push(`articles/${articles.article.article.slug}`);
      }
    }
  }

  handleChange = (tags) => {
    this.setState({
      tags,
    });
  };

  uploadCallback = file => new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', process.env.REACT_APP_IMGUR_URL);
      xhr.setRequestHeader('Authorization', process.env.REACT_APP_IMGUR_CLIENT_ID);
      const data = new FormData();
      data.append('image', file);
      xhr.send(data);

      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });

      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    },
  )

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      image = event.target.image.files[0],
      tags,
      editorState,
    } = this.state;

    const body = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const articleData = {
      title,
      description,
      body,
      image,
      tags,
    };
    const { createArticle } = this.props;
    createArticle(articleData);
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  render() {
    const { editorState } = this.state;
    return (
      <div id="create-article-container">
        <form onSubmit={this.onSubmit} error className="create-article-form" encType="multipart/form-data">
          <h1>
            <Form.Input
              fluid
              label="Add a title"
              name="title"
              placeholder="Title"
              className="editor-input"
              maxLength={100}
              onChange={this.onChange}
            />
          </h1>
          <Divider />
          <Form.Input
            fluid
            name="description"
            placeholder="Description"
            transparent
            className="description-input"
            maxLength={300}
            onChange={this.onChange}
          />
          <Divider />

          <TagsInput
            value={this.state.tags}
            onChange={this.handleChange}
          />
          <Divider />
          <br />
          <Editor
            toolbarOnFocus
            placeholder="The body of the article goes here..."
            body={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.onEditorStateChange}
            hashtag={{
              separator: ' ',
              trigger: '#',
            }}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                uploadEnabled: true,
                previewImage: true,
                uploadCallback: this.uploadCallback,
              },
            }}
          />
          <input
            type="submit"
            value="Post"
            className="btn btn-primary btn-lg"
            id="submit"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.article,
});
export default connect(
  mapStateToProps,
  { createArticle },
)(createArticleView);
