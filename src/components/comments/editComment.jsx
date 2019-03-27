import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, Segment,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateComment } from '../../actions/postUpdateCommentAction';

class EditCommentComponent extends Component {
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUpdate = (e) => {
    const {
      updateComment: editComment,
      commentId, articleSlug,
    } = this.props;
    e.preventDefault();
    const info = { ...this.state };
    const comment = {
      body: info,
    };
    editComment(articleSlug, commentId, comment);
  };

  render() {
    const { commentDetails, handleClose } = this.props;
    return (
      <div id="update-comment-section">
        <Segment basic>
          <Form reply>
            <div id="update-text-section">
              <p id="delete-popup-text">Update Comment ?</p>
            </div>
            <Form.TextArea
              onChange={this.onChange}
              name="body"
              id="update-comment-area"
            >
              {commentDetails}
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
                content="Update"
                primary
                onClick={this.handleUpdate}
                loading={updateComment.isUpdating}
              />
            </Button.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

EditCommentComponent.propTypes = {
  updateComment: PropTypes.shape.isRequired,
  commentId: PropTypes.number.isRequired,
  commentDetails: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  articleSlug: PropTypes.shape.isRequired,
};

const mapStateToProps = ({ updateComment }) => ({ updateComment });

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    updateComment,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(EditCommentComponent);
