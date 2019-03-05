import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const NavigationView = () => (
  <div>
    <Menu text>
      <NavLink to="/">
        <Menu.Item name="Home" />
      </NavLink>
      <NavLink to="/login">
        <Menu.Item name="Login" />
      </NavLink>
    </Menu>
  </div>
);


export default NavigationView;
