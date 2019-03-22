/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Item, Divider,
} from 'semantic-ui-react';
import { getArticles } from '../../actions/listArticles';
import './articles.scss';

class HomeView extends Component {
  // Create a login view of the application
  componentDidMount() {
    this.props.getArticles();
  }

  displayText = str => str.split(/\s+/).slice(0, 50).join(' ')

  render() {
    const { articles } = this.props;
    let articleContent;
    if (articles) {
      if (articles.success) {
        articleContent = articles.articles.article.results.map(article => (
          <Item className="article-container">
            <Item.Image
              src={article.image
                ? article.image.slice(13)
                : 'https://res.cloudinary.com/muthuri/image/upload/v1553159318/main-main-reading.jpg'}
              size="small"
            />
            <Item.Content>
              <Item.Header as="a">
                <a href={`/articles/${article.slug}`}><h1>{article.title}</h1></a>
                <Divider />
                <h3>
              By:
                  {' '}
                  {article.author}
                </h3>
              </Item.Header>
              <Item.Description>
                <p
                  style={{
                    fontSize: '1.3em',
                    fontFamily: 'Helvetica',
                  }}
                >
                  {article.description}

                </p>
              </Item.Description>
              <Item.Extra>
              Created at:
                {' '}
                {article.created_at.slice(0, 11)}
              </Item.Extra>
            </Item.Content>
          </Item>
        ));
      }
    }

    return (
      <div id="articles-list-container">
        <Item.Group>
          {articleContent}
        </Item.Group>
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
