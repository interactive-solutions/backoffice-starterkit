import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

export const SubMenuItem = (props) => (
  <Menu.Item
    color='red'
    name={props.text}
    active={props.activeItem === props.text}
    onClick={props.setActiveItem}
  >
    {props.text}
  </Menu.Item>
);

SubMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  setActiveItem: PropTypes.func
};
