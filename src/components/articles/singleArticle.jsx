import React, { Component } from 'react';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { Redirect } from 'react-router-dom';
import { Label, Segment } from 'semantic-ui-react';
import fetchSingleArticle, { deleteArticle, likeDislikeArticle } from '../../actions/articlesAction';
import Loader from '../loader';
import LikeDislike from './likeDislike';
import './articles.scss';
import CommentReplyComment from '../comments/comments';
import { deleteComment } from '../../actions/deleteComentAction';
import RateArticle from './rating';

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
      const contentInString = draftToHtml(JSON.parse(articles.body));
      document.getElementById('single-article-container').innerHTML = contentInString;
      this.update = false;
    }
  }

  handleDelete = (event) => {
    event.preventDefault();
    this.props.deleteArticle(this.slug);
  }

  handleLike = () => {
    this.props.likeDislikeArticle(this.slug, 'like');
  }

  handleDislike = () => {
    this.props.likeDislikeArticle(this.slug, 'dislike');
  }

  render() {
    const {
      isLoading, isSuccess, isDeleted, isFound, articles
    } = this.props.article;
    if (isLoading) {
      return (
        <Loader />
      );
    }

    const loggedinUser = window.localStorage.getItem('token');

    if (isDeleted && !isFound) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container" id="article-holder">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
        <Segment>
          { isSuccess ? (
            <div>
              {
              localStorage.getItem('username') === articles.author ? (
                <div className="button-controls">

                  <a href={`edit/${this.slug}`} className="float-e">
                    <i className="fa fa-pencil float-edit" />
                  </a>
                  <a href={`delete/${this.slug}`} onClick={this.handleDelete} className="float-t">
                    <i className="fa fa-trash float-trash" />
                  </a>
                </div>
              ) : (null)
            }
              <h2 className="art-title">{articles.title}</h2>
              <h6>
                Authored by
                {' '}
                <b>{articles.author}</b>
                {' '}
                on
                {' '}
                <b>{articles.created_at}</b>
              </h6>
              <h3>
                <em>
              &quot;
                  {articles.description}
                &quot;
                </em>
              </h3>
            </div>
          ) : (null) }
          <div className="cover-image" />
          <div id="single-article-container" />
        </Segment>
        {
          isSuccess ? (
            <LikeDislike handleLike={this.handleLike} handleDislike={this.handleDislike} />
          ) : (null)
        }

        <br />

        {
          (articles)
          && articles.tags.map(object => (
            <Label as="a" className="article-tags" tag>
              {object}
            </Label>
          ))
        }
        <div>


          {loggedinUser ? (
            <div>
              {isSuccess ? (
                <div>
                  <br />
                  <br />
                  <div>
                    {localStorage.getItem('username') === articles.author ? (null) : (
                      <RateArticle />

                    )}
                  </div>
                  <div className="avrgRating">
                    <br />
                    <h6>Avg. Rating</h6>
                    <i className="fa fa-star" id="avgRating" />
                    <h5 id="averageRating" className="art-avgRating">{articles.averageRating}</h5>
                  </div>
                </div>

              ) : (null)
              }
            </div>
          ) : (
            <div>
              {isSuccess ? (
                <div className="avrgRating">
                  <br />
                  <br />
                  <h6>Avg. Rating</h6>
                  <i className="fa fa-star" id="avgRating" />
                  <h5 className="art-avgRating">{articles.averageRating}</h5>
                </div>
              ) : (null)}
            </div>
          )}
        </div>

        {
          isSuccess ? <CommentReplyComment slug={this.slug} deleteComment={commentId => this.props.deleteComment(commentId)} /> : (null)
        }


      </div>


    );
  }
}

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(
  mapStateToProps,
  {
    fetchSingleArticle,
    deleteArticle,
    likeDislikeArticle,
    deleteComment,
  },
)(SingleArticle);
