import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Comment, Popup, Form, Checkbox,
} from 'semantic-ui-react';
import '../../styles/profile.scss';
import { fetchComments } from '../../actions/commentAction';
import { updateComment } from '../../actions/postUpdateCommentAction';
import { deleteComment } from '../../actions/deleteComentAction';
import EditCommentComponent from './editComment';
import ReplyCommentComponent from './replyComment';

const username = localStorage.getItem('username');

// eslint-disable-next-line react/prefer-stateless-function
class CommentSingleComment extends React.Component {
  state = {
    isUpdatePopUpOpen: false,
    isDeletePopUpOpen: false,
    collapsed: true,
    isReplyPopUpOpen: false,
  };

  handleCheckbox = (e, { checked }) => this.setState({ collapsed: checked })

  handleUpdateOpen = () => {
    this.setState({ isUpdatePopUpOpen: true, isDeletePopUpOpen: false });
  };

  handleReplyOpen = () => {
    this.setState({ isReplyPopUpOpen: true });
  };

  handleReplyClose = () => {
    this.setState({ isReplyPopUpOpen: false });
  };

  handleUpdateClose = () => {
    this.setState({ isUpdatePopUpOpen: false, isDeletePopUpOpen: false });
  };

  handleClose = () => {
    this.setState({ isUpdatePopUpOpen: false, isDeletePopUpOpen: false });
  }

  handleDeleteOpen = () => {
    this.setState({ isUpdatePopUpOpen: false, isDeletePopUpOpen: true });
  };

  handleDeleteClose = () => {
    this.setState({ isUpdatePopUpOpen: false, isDeletePopUpOpen: false });
  };

  handleDelete = (e) => {
    const {
      comment,
    } = this.props;
    const data = { articleSlug: this.props.slug, commentId: comment.id };

    this.props.deleteComment(data);
  };

  render() {
    const { isUpdatePopUpOpen, isDeletePopUpOpen, isReplyPopUpOpen, collapsed } = this.state;
    const { comment } = this.props;
    if (this.props.comments.isFetched) {
      return (
        <Comment>
          <Comment.Avatar id="avatar" src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
          <Comment.Content>
            <Comment.Author id="author" as="a">{comment.author}</Comment.Author>
            <Comment.Metadata id="date">
              <div>{comment.created_at}</div>
            </Comment.Metadata>
            <Comment.Text className="comment-body">{comment.body}</Comment.Text>
            {/* {' '} */}
            <Comment.Actions>
              {comment.author === username ? (
                <Popup
                  id="update-comment-body"
                  trigger={(
                    <Comment.Action>
                      <Button icon="pencil alternate" />
                    </Comment.Action>
)}
                  content={(
                    <EditCommentComponent
                      commentId={comment.id}
                      commentDetails={comment.body}
                      handleClose={this.handleUpdateClose}
                      articleSlug={this.props.slug}
                    />
)}
                  on="click"
                  open={isUpdatePopUpOpen}
                  onClose={this.handleClose}
                  onOpen={this.handleUpdateOpen}
                  verticalOffset={45}
                  position="top left"
                />
              ) : null}
              {comment.author === username ? (
                <Popup
                  id="delete-comment-body"
                  trigger={(
                    <Comment.Action>
                      <Button icon="trash alternate" />
                    </Comment.Action>
)}
                  content={(
                    <Form reply>
                      <div id="delete-text-section">
                        <p id="delete-popup-text">Delete Comment ?</p>
                      </div>
                      <Button.Group>
                        <Button
                          id="cancel-comment-button"
                          content="Cancel"
                          primary
                          onClick={this.handleDeleteClose}
                        />
                        <Button
                          id="delete-comment-button"
                          content="Delete"
                          primary
                          onClick={this.handleDelete}
                          loading={deleteComment.isDeleting}
                        />
                      </Button.Group>
                    </Form>
                )}
                  on="click"
                  open={isDeletePopUpOpen}
                  onClose={this.handleDeleteClose}
                  onOpen={this.handleDeleteOpen}
                  verticalOffset={45}
                  position="top left"
                />
              ) : null}
            </Comment.Actions>
            <Comment.Actions>
              <Popup
                id="update-comment-body"
                trigger={(
                  <Comment.Action>
                      Reply
                  </Comment.Action>
)}
                content={(
                  <ReplyCommentComponent
                    commentId={comment.id}
                    handleClose={this.handleReplyClose}
                    articleSlug={this.props.slug}
                  />
)}
                on="click"
                open={isReplyPopUpOpen}
                onClose={this.handleClose}
                onOpen={this.handleReplyOpen}
                verticalOffset={45}
                position="top left"
              />
              <Comment.Action>
                <Checkbox defaultChecked label="view replies" onChange={this.handleCheckbox} />
              </Comment.Action>
              <Comment.Group collapsed={collapsed}>
                {comment.threads.map(reply => (
                  <Comment.Text>
                    {reply.author}
:
                    {reply.body}
                  </Comment.Text>
                ))}
              </Comment.Group>

            </Comment.Actions>
          </Comment.Content>
        </Comment>
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
  { fetchComments, updateComment, deleteComment },
)(CommentSingleComment);
