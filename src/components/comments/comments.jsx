import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Comment, Form, Header,
} from 'semantic-ui-react';
import '../../styles/profile.scss';
import { fetchComments } from '../../actions/commentAction';
import { createComment, updateComment } from '../../actions/postUpdateCommentAction';
import CommentSingleComment from './comment';


// eslint-disable-next-line react/prefer-stateless-function
class CommentReplyComment extends React.Component {
  constructor(props) {
    super(props);
    props.fetchComments(props.slug);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createComment(this.props.slug, event.target.commentArea.value);
  };

  render() {
    if (this.props.comments.isFetched) {
      return (
        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>
          <Form reply onSubmit={this.handleSubmit}>
            <Form.TextArea
              id="comment-field"
              name="commentArea"
              placeholder="Add your comment here"
              required
            />
            <Button
              id="comment"
              type="submit"
              content="Add Comment"
              labelPosition="right"
              icon="edit"
              primary
            />
          </Form>
          {this.props.comments.comments.comment.map(comment => (
            <CommentSingleComment comment={comment} key={comment.id} slug={this.props.slug} />
          ))}
        </Comment.Group>
      );
      // eslint-disable-next-line no-else-return
    } else {
      return <div>Comments loading...</div>;
    }
  }
}

const mapStateToProps = state => ({
  comments: state.getcomments,
});

export default connect(
  mapStateToProps,
  { fetchComments, createComment, updateComment },
)(CommentReplyComment);
