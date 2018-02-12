import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';
import './style/navbar.scss';

export class TopLevelMenuItem extends Component { // eslint-disable-line
  static propTypes = {
    children: PropTypes.object,
    name: PropTypes.string.isRequired,
    topLevelMenuItemProps: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
  }

  render() {
    return (
      <Menu.Item
        color='red'
        name={this.props.name}
        {...(this.props.topLevelMenuItemProps)}
      >
        <Icon name={this.props.icon}/>
        {this.props.caption}
        {this.props.children}
      </Menu.Item>
    );
  }
}
