import React from 'react';
import { shallow } from 'enzyme';
import PasswordUpdate from './resetPassword';

const response = {
  errors: {},
};

it('should render a label', () => {
  const onChange = () => ({});
  const onSubmit = () => ({});

  const wrapper = shallow(
    <PasswordUpdate
      onChange={onChange}
      onSubmit={onSubmit}
      response={response}
    />,
  );
  expect(wrapper.length).toBe(1);
});
