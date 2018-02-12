import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';
import { SubMenu } from './submenu';
import './style/navbar.scss';

export class TopLevelMenuItem extends Component { // eslint-disable-line
  static propTypes = {
    children: PropTypes.object,
    name: PropTypes.string.isRequired,
    topLevelMenuItemProps: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    setActiveItem: PropTypes.func.isRequired,
    subMenuContent: PropTypes.object
  }

  /**
   * @param textArray Array of sub-menu items as a string array.
   * @param index Used to give the menu item a unique 'key'.
   */
  createAllSubMenuLinks = (textArray) => {
    if (!textArray || textArray.length === 0) {
      return null;
    }
    return (
      <SubMenu>
        {textArray.map(this.createSubMenuLink)}
      </SubMenu>
    );
  }

  render() {
    const { subMenuContent } = this.props;

    return (
      <Menu.Item
        color='red'
        name={this.props.name}
        {...(this.props.topLevelMenuItemProps)}
      >
        <Icon name={this.props.icon}/>
        {this.props.caption}
        <SubMenu subMenuContent={subMenuContent}/>
      </Menu.Item>
    );
  }
}
