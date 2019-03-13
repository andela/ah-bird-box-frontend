import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

const SocialButton = (props) => {
  const {
    provider, providerName, type, className, icon, loading,
    retrieveSocialAuthData,
  } = props;
  return (
    <Button
      circular
      type={type}
      className={className}
      icon={icon}
      loading={loading}
      onClick={() => retrieveSocialAuthData(provider, providerName, type)}
    />
  );
};
SocialButton.propTypes = {
  provider: PropTypes.string,
  providerName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  retrieveSocialAuthData: PropTypes.func.isRequired,
};

SocialButton.defaultProps = {
  provider: null,
};
export default SocialButton;
