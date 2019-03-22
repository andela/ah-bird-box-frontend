import React, { Component } from 'react';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { Redirect } from 'react-router-dom';
import fetchSingleArticle, { deleteArticle } from '../../actions/articlesAction';
import Loader from '../loader';
import './articles.scss';

class SingleArticle extends Component {
  constructor(props) {
    super(props);
    this.update = true;
    const urlArray = window.location.href.split('/');
    this.slug = urlArray[urlArray.length - 1];
    const { isTriggered } = this.props.article;
    if (!isTriggered) {
      this.props.fetchSingleArticle(this.slug);
    }
  }

  componentDidUpdate = () => {
    const { isSuccess, articles } = this.props.article;
    if (isSuccess && this.update) {
      const contentInString = draftToHtml(JSON.parse(articles.article.body));
      document.getElementById('single-article-container').innerHTML = contentInString;
      this.update = false;
    }
  }

  handleDelete = (event) => {
    event.preventDefault();
    this.props.deleteArticle(this.slug);
  }

  render() {
    const {
      isLoading, isSuccess, isDeleted, isFound, articles,
    } = this.props.article;
    if (isLoading) {
      return (
        <Loader />
      );
    }

    if (isDeleted && !isFound) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container" id="article-holder">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
        { isSuccess ? (
          <div>
            {
              localStorage.getItem('username') === articles.article.author ? (
                <div id="button-controls">

                  <a href={`edit/${this.slug}`} className="float-e">
                    <i className="fa fa-pencil float-edit" />
                  </a>
                  <a href={`delete/${this.slug}`} onClick={this.handleDelete} className="float-t">
                    <i className="fa fa-trash float-trash" />
                  </a>
                </div>
              ) : (null)
            }
            <h2 className="art-title">{articles.article.title}</h2>
            <h6>by</h6>
            <h5>{articles.article.author}</h5>
            <h3>
              <em>
              &quot;
                {articles.article.description}
                &quot;
              </em>
            </h3>
          </div>
        ) : (null) }
        <div id="single-article-container" />
      </div>

    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(
  mapStateToProps,
  { fetchSingleArticle, deleteArticle },
)(SingleArticle);
