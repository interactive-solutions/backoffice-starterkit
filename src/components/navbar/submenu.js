import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { SubMenuLink } from './submenu-link';
import './style/navbar.scss';

export class SubMenu extends Component { // eslint-disable-line
  static propTypes = {
    subMenuContent: PropTypes.object,
    setActiveItem: PropTypes.func.isRequired,
    activeItem: PropTypes.string.isRequired
  }

  render() {
    const { subMenuContent, setActiveItem, activeItem } = this.props;

    if (!subMenuContent || subMenuContent.length === 0) {
      return null;
    }

    return (
      <Menu.Item>
        {subMenuContent.map((text, index) => (
          <SubMenuLink
            key={index}
            text={text}
            setActiveItem={setActiveItem}
            activeItem={activeItem}
          />
        ))}
      </Menu.Item>
    );
  }
}
