import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Rating } from 'semantic-ui-react';
import { rateArticles } from '../../actions/rating';
import './articles.scss';

class RateArticle extends Component {
  constructor(props) {
    super(props);
    const urlArray = window.location.href.split('/');
    this.slug = urlArray[urlArray.length - 1];
  }

  handleChange = (event, { rating }) => {
    this.props.rateArticles(rating, this.slug);
  }

  render() {
    return (
      <div className="rating">
        <Rating name="stars" icon="star" maxRating={5} size="massive" onRate={this.handleChange} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.rate,
});

export default connect(
  mapStateToProps,
  { rateArticles },
)(RateArticle);
