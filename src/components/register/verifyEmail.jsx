import React from 'react';
import './Register.scss';

const VerifyMail = () => (
  <div className="jumbotron container" id="verify-mail-notif">
            Your account has been created successfully, please verify your email then
    {' '}
    <a href="/login">login</a>
  </div>
);

export default VerifyMail;
