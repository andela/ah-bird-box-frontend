import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../Login';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    registerUser: jest.fn(),
  };
  const wrapper = shallow(<Login {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('Login elements tests', () => {
  it('renders a the login form elements', () => {
    const { wrapper } = setup();
  });
});
