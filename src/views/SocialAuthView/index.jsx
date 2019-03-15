import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Redirect } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { auth, GoogleProvider, FacebookProvider } from '../../config/firebase';
import { FACEBOOK, GOOGLE } from '../../actions/types';
import SocialButton from '../../components/SocialAuthButttons';
import { socialAuthLogin } from '../../actions/socialAuthActions';

class SocialAuthView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      providers: [
        {
          provider: FacebookProvider,
          type: FACEBOOK,
          name: 'facebook',
          class_name: 'facebook',
          icon: 'facebook f',
          color: 'vk',
        },
        {
          provider: GoogleProvider,
          type: GOOGLE,
          name: 'google-oauth2',
          class_name: 'google',
          icon: 'google',
          color: 'google plus',
        },
      ],
    };
  }

  retrieveSocialAuthData = (oauthprovider, platform, authType) => {
    auth
      .signInWithPopup(oauthprovider)
      .then(response => (

        {
          type: authType,
          payload: {
            authData: {
              provider: platform,
              accessToken: response.credential.accessToken,
            },
            userDetails: {
              name: response.user.displayName,
              photo: response.user.photoURL,
              email: response.user.email,
            },
          },
        }))
      .then((result) => {
        localStorage.setItem('username', result.payload.userDetails.name);
        const { authData } = result.payload;
        const { userDetails } = result.payload;
        const tokenPayload = {};
        tokenPayload.provider = authData.provider;
        tokenPayload.access_token = authData.accessToken;
        const { socialAuthLogin } = this.props;
        const payload = {};
        payload.authData = tokenPayload;
        payload.userDetails = userDetails;
        socialAuthLogin(payload);
      })
      .catch(() => {
        toastr.error('Your email has are already been used to log in with another service');
      });
  }

  displaySocialLoginButtons = (providers, loading) => (
    <div>
      {providers.map(providersIdentity => (
        <SocialButton
          key={providersIdentity.name}
          Provider={providersIdentity.provider}
          providerName={providersIdentity.name}
          type={providersIdentity.type}
          className={providersIdentity.class_name}
          buttonClass={providersIdentity.button_class}
          loading={loading}
          retrieveSocialAuthData={() => {
            this.retrieveSocialAuthData(
              providersIdentity.provider,
              providersIdentity.name,
              providersIdentity.type,
            );
          }}
          icon={providersIdentity.icon}
          color={providersIdentity.color}
        />
      ))}
    </div>
  );

  render() {
    if (this.props.socialAuth.message === 'success' && !this.props.socialAuth.isLoading) {
      return (
        toastr.success(`${localStorage.getItem('username')} logged in successfully`),
          <Redirect to="/" />
      );
    }
    const { providers } = this.state;
    const { socialAuth } = this.props;
    const { isLoading } = socialAuth;
    return (
      <div>
        {(socialAuth.error) ? toastr.error(socialAuth.errors) : null}
        <div>{this.displaySocialLoginButtons(providers, isLoading)}</div>
      </div>
    );
  }
}

SocialAuthView.propTypes = {
  socialAuth: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  socialAuth: state.socialAuth,
});

const mapDispatchToProps = (dispatch) => {
  const actionCreators = {
    socialAuthLogin: data => dispatch(socialAuthLogin(data)),
  };
  return actionCreators;
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SocialAuthView));
