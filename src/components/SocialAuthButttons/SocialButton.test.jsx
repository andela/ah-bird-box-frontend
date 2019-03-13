import React from 'react';
import { shallow } from 'enzyme';
import SocialButton from '.';

it('should render social auth login button component', () => {
  const props = {
    provider: 'oauth',
    providerName: 'oauth',
    type: 'oauth',
    className: 'button',
    buttonClass: 'button',
    icon: 'social',
    loading: false,
  };
  const retrieveSocialAuthData = provider => ({ provider });
  const wrapper = shallow(<SocialButton
    circular
    type={props.type}
    providerName={props.providerName}
    className={props.className}
    buttonClass={props.buttonClass}
    icon={props.icon}
    loading={props.loading}
    retrieveSocialAuthData={retrieveSocialAuthData}
    onClick={() => retrieveSocialAuthData()}
  />);
  expect(wrapper.length).toBe(1);
});
