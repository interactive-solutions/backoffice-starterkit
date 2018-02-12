import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

export class SubMenuItem extends Component { // eslint-disable-line
  static propTypes = {
    text: PropTypes.string.isRequired,
    activeItem: PropTypes.string.isRequired,
    setActiveItem: PropTypes.func
  }

  render() {
    return (
      <Menu.Item
        color='red'
        name={this.props.text}
        active={this.props.activeItem === this.props.text}
        onClick={this.props.setActiveItem}
      >
        {this.props.text}
      </Menu.Item>
    );
  }
}
