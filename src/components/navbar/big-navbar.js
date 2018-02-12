import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from 'assets/svg/is_tab_white.svg';
import { Menu, Image } from 'semantic-ui-react';
import { TopLevelMenuItem } from './top-level-menu-item';
import './style/navbar.scss';

export class BigNavbar extends Component { // eslint-disable-line
  static propTypes = {
    // text: PropTypes.string.isRequired,
    // activeItem: PropTypes.string.isRequired,
    // onClick: PropTypes.func
    visible: PropTypes.bool.isRequired,
    sideMenuContent: PropTypes.object,
    activeItem: PropTypes.string.isRequired,
    setActiveItem: PropTypes.func.isRequired
  }

  /**
   * This is the root side-bar creation method.
   * It creates the entire side-menu, by calling
   * the other helper methods.
   *
   * sideMenuContent The side-menu in JSON format imported above
   */
  createSideMenu(sideMenuContent, activeItem, setActiveItem) {
    if (!sideMenuContent) {
      return null;
    }

    return sideMenuContent.map((menu, index) => {
      const name = menu.menuItem.caption;
      let topLevelMenuItemProps = {};

      const active = menu.menuItem.caption === activeItem;

      if (menu.menuItem.link) {
        topLevelMenuItemProps = {
          active,
          onClick: setActiveItem
        };
      }
      if (menu.menuItem.callback) {
        topLevelMenuItemProps = {
          onClick: () => menu.menuItem.callback(this)
        };
      }

      return (
        <TopLevelMenuItem
          key={index}
          name={name}
          topLevelMenuItemProps={topLevelMenuItemProps}
          icon={menu.menuItem.icon}
          caption={menu.menuItem.caption}
          subMenuContent={menu.subMenu}
          setActiveItem={setActiveItem}
        />
      );
    });
  }

  render() {
    const { visible, sideMenuContent, activeItem, setActiveItem } = this.props;
    const navbarStyles = `no-margins-or-padding min-height-100${visible ? ' navbar' : ' invisible-navbar'}`;

    return (
      <Menu
        styleName={navbarStyles}
        inverted
        vertical
      >
        <Image centered size='small' src={Logo}/>
        {this.createSideMenu(sideMenuContent, activeItem, setActiveItem)}
      </Menu>
    );
  }
}
