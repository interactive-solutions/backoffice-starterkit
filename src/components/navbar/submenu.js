import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import './style/navbar.scss';

export class SubMenu extends Component { // eslint-disable-line
  static propTypes = {
    children: PropTypes.object
  }

  render() {
    return (
      <Menu.Item>
        {this.props.children}
      </Menu.Item>
    );
  }
}
