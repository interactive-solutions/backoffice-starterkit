import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import './style/navbar.scss';

export class SubMenuLink extends Component { // eslint-disable-line
  static propTypes = {
    text: PropTypes.string.isRequired,
    activeItem: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }

  render() {
    return (
      <Menu.Item
        color='red'
        name={this.props.text}
        active={this.props.activeItem === this.props.text}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </Menu.Item>
    );
  }
}
