import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import {
  EditorState, convertFromRaw, convertToRaw,
} from 'draft-js';
import {
  Form, Divider,
} from 'semantic-ui-react';
import Loader from '../loader';
import fetchSingleArticle, {
  updateArticle,
} from '../../actions/articlesAction';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.update = true;
    const urlArray = window.location.href.split('/');
    this.slug = urlArray[urlArray.length - 1];
  }

  componentDidMount = () => {
    const { isTriggered } = this.props.article;
    if (isTriggered === false) {
      this.props.fetchSingleArticle(this.slug);
    }
  };

  componentDidUpdate = () => {
    const { isSuccess, articles } = this.props.article;
    if (isSuccess && this.update) {
      this.setState({
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(articles.body))),
      });
      this.update = false;
    }
  }

  onSubmit = (event) => {
    const { editorState } = this.state;
    event.preventDefault();
    const body = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    const updatedData = {
      title: event.target.title.value,
      description: event.target.description.value,
      body,
    };
    this.props.updateArticle(updatedData, this.slug);
  }

  uploadCallback = file => new Promise((resolve, reject) => {
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
  });

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.article.isUpdated) {
      window.location.assign(`/articles/${this.slug}`);
    }
  }

  render() {
    const { isLoading } = this.props.article;

    if (isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    const { editorState } = this.state;
    const { isSuccess, articles } = this.props.article;
    return (
      <div className="container" id="edit-article-holder">
        <form onSubmit={this.onSubmit}>
          <h2>
            <Form.Input
              fluid
              name="title"
              placeholder="Title"
              transparent
              className="editor-input"
              defaultValue={isSuccess ? articles.title : null}
              maxLength={100}
              onChange={this.onChange}
            />
          </h2>
          <Divider />
          <h4>
            <Form.Input
              fluid
              name="description"
              placeholder="Description"
              transparent
              className="description-input"
              defaultValue={isSuccess ? articles.description : null}
              maxLength={300}
              onChange={this.onChange}
            />
          </h4>

          <Divider />

          <Editor
            toolbarOnFocus
            editorState={editorState}
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
            value="Update Article"
            className="btn btn-primary btn-lg"
            id="submit"
          />
        </form>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(
  mapStateToProps,
  { updateArticle, fetchSingleArticle },
)(EditArticle);
