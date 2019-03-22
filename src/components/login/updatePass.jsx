import React from 'react';
import '../register/Register.scss';

const UpdatePass = () => (
  <div className="jumbotron container" id="verify-mail-notif">
            Your password reset request is successful, please set your new password then
    {' '}
    <a href="/login">login</a>
  </div>
);

export default UpdatePass;
