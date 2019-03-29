import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Segment,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../styles/profile.scss';
import { replyComment } from '../../actions/replyCommentAction';

class ReplyCommentComponent extends Component {
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleReply = (e) => {
    const {
      replyComment: respondComment,
      commentId, articleSlug,
    } = this.props;
    e.preventDefault();
    const info = { ...this.state };
    respondComment(articleSlug, commentId, info);
  };

  render() {
    const { handleClose } = this.props;
    return (
      <div id="reply-comment-section">
        <Segment basic>
          <Form reply>
            <div id="reply-text-section">
              <p id="reply-text"> reply ?</p>
            </div>
            <Form.TextArea
              onChange={this.onChange}
              name="body"
              id="reply-comment-area"
            >
            </Form.TextArea>
            <Button.Group>
              <Button
                id="cancel-comment-button"
                content="Cancel"
                primary
                onClick={handleClose}
              />
              <Button
                id="update-popup-button"
                content="Reply"
                primary
                onClick={this.handleReply}
              />
            </Button.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

ReplyCommentComponent.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({ replyComment }) => ({ replyComment });

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    replyComment,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(ReplyCommentComponent);
