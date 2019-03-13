import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import verifyEmail from '../../actions/verifyAction';

const Verify = (props) => {
  if (props.verify.isTriggered === false) {
    const urlArray = window.location.href.split('/');
    const token = urlArray[urlArray.length - 1];
    props.verifyEmail(token);
  }

  if (props.verify.isVerified) {
    return (
      <Redirect to="/login" />
    );
  }

  if (props.verify.failed) {
    return (
      <Redirect to="/register" />
    );
  }

  return null;
};

const mapStateToProps = state => ({
  verify: state.verify,
});

export default connect(
  mapStateToProps,
  { verifyEmail },
)(Verify);
