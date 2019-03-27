/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Item, Label, Pagination
} from 'semantic-ui-react';
import renderHTML from 'react-render-html';
import TruncateMarKup from 'react-truncate-markup';
import Loader from '../loader';
import { getArticles } from '../../actions/listArticles';
import './articles.scss';

class HomeView extends Component {

  state = {
    activePage: 1
  };

  componentDidMount() {
    this.props.getArticles();
  }

  componentWillReceiveProps () {
    window.scrollTo(0, 0);
  }

  displayText = str => str.split(/\s+/).slice(0, 50).join(' ')

  handlePagination = (e, { activePage }) => {
    this.setState({ activePage }, () => {
      const currentState = this.state;
      const currentPage = currentState.activePage;
      const { getArticles } = this.props;
      getArticles(currentPage);
      this.setState({ activePage: currentPage });
    });
  }

  render() {
    const { isLoading } = this.props.articles;
    if (isLoading) {
      return (
        <Loader />
      );
    }
    const { articles } = this.props;
    const { activePage } = this.state;
    let articleContent;
    if (articles) {
      if (articles.success) {
        articleContent = articles.articles.article.results.map(article => (
          <Item className="article-container">
            <Item.Image className="image"
              src={article.image_url
                ? article.image_url
                : 'https://res.cloudinary.com/muthuri/image/upload/v1553159318/main-main-reading.jpg'}
              size="small"
            />
            <Item.Content>
              <Item.Header as="a">
                <a className="article-title" href={`/articles/${article.slug}`}>{article.title}</a>
              </Item.Header>
              <TruncateMarKup lines={6}>
                <p className="article-description">{renderHTML(article.description)}</p>
              </TruncateMarKup>
              <Item.Extra>
                <Label>{`Created by: ${article.author}`}</Label>
                <Label>Created on: {article.created_at.slice(0, 11)}</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ));
      }
    }

    return (
      <div>
        <div className="authors-haven-header">
            <p>Author's Haven</p>
            <p>A Social platform for the creative at heart.</p>
        </div>
        <div id="articles-list-container">
          <Item.Group>
            {articleContent}
          </Item.Group>
          { articles.success && articles.articles.article.count > 10 && (
              <div>
                <Pagination
                  id="pagination"
                  totalPages={Math.ceil(articles.articles.article.count / 10)}
                  activePage={activePage}
                  onPageChange={this.handlePagination}
                />
              </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.getAll,
});

export default connect(
  mapStateToProps,
  { getArticles },
)(HomeView);
