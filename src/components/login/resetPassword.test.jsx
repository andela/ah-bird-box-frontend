import React from 'react';
import { shallow } from 'enzyme';
import PasswordReset from './resetPassword';

const response = {
  errors: {},
};

it('should render a label', () => {
  const onChange = () => ({});
  const onSubmit = () => ({});

  const wrapper = shallow(
    <PasswordReset
      onChange={onChange}
      onSubmit={onSubmit}
      response={response}
    />,
  );
  expect(wrapper.length).toBe(1);
});
