import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

const LikeDislike = props => (
  <div className="like-dislike">
    {
      props.article.isSuccess && props.article.articles.liked_by.includes(parseInt(localStorage.getItem('id'))) ? (
        <Button
          id="like-button"
          color="green"
          content="Like"
          icon="thumbs up outline icon"
          onClick={props.handleLike}
          label={{
            basic: true, color: 'green', pointing: 'left', content: props.article.articles.likes_count,
          }}
        />
      ) : (
        <Button
          id="like-button"
          content="Like"
          icon="thumbs up outline icon"
          onClick={props.handleLike}
          label={{
            pointing: 'left', content: props.article.articles.likes_count,
          }}
        />
      )

    }
    {
      props.article.isSuccess && props.article.articles.disliked_by.includes(parseInt(localStorage.getItem('id'))) ? (
        <Button
          id="dislike-button"
          color="red"
          content="Dislike"
          icon="thumbs down outline icon"
          onClick={props.handleDislike}
          label={{
            as: 'a', color: 'red', pointing: 'left', content: props.article.articles.dislikes_count,
          }}
        />
      ) : (
        <Button
          id="dislike-button"
          content="Dislike"
          icon="thumbs down outline icon"
          onClick={props.handleDislike}
          label={{
            as: 'a', pointing: 'left', content: props.article.articles.dislikes_count,
          }}
        />
      )
    }
  </div>
);

const mapStateToProps = state => ({
  article: state.article,
});

export default connect(
  mapStateToProps,
)(LikeDislike);
