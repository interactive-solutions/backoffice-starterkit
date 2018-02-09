// import MediaQuery from 'react-responsive';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Menu,
  Image,
  Container
} from 'semantic-ui-react';
import Logo from 'assets/svg/is_tab_white.svg';
import { sideMenuContent } from './side-menu-content';
import './style/navbar.scss';

export class Navbar extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'Dashboard',
      navbarIsVisible: true
    };
  }

  componentWillMount() {
    this.setActiveItemByRoute(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setActiveItemByRoute(nextProps);
  }

  setActiveItemByRoute(props) {
    if (props.location) {
      const path = props.location.pathname;
      const activeItem = path.charAt(1).toUpperCase() + path.slice(2);
      this.setState({ activeItem });
    }
  }

  setActiveItem = (e, { name }) => {
    e.stopPropagation();
    this.setState({ activeItem: name });
    this.props.history.push(name.toLowerCase().replace(' ', ''));
  }

  /**
   * Create a single menu item.
   *
   * @param text What is displayed on the menu item.
   */
  createSubMenuLink = (text) => (
    <Menu.Item
        key={text}
        color='red'
        name={text}
        active={this.state.activeItem === text}
        onClick={this.setActiveItem}
    >
      {text}
    </Menu.Item>
  )

  /**
   * @param textArray Array of sub-menu items as a string array.
   * @param index Used to give the menu item a unique 'key'.
   */
  createAllSubMenuLinks = (textArray, index) => {
    if (!textArray || textArray.length === 0) {
      return null;
    }
    return (
      <Menu.Menu key={index}>
        {textArray.map(this.createSubMenuLink)}
      </Menu.Menu>
    );
  }

  /**
   * This is the root side-bar creation method.
   * It creates the entire side-menu, by calling
   * the other helper methods.
   *
   * sideMenuContent The side-menu in JSON format imported above
   */
  createSideMenu() {
    if (!sideMenuContent) {
      return null;
    }

    return sideMenuContent.map((menu, index) => {
      const name = menu.menuItem.caption;
      let topLevelMenuItemProps = {};

      const active = menu.menuItem.caption === this.state.activeItem;

      if (menu.menuItem.link) {
        topLevelMenuItemProps = {
          active,
          onClick: this.setActiveItem
        };
      }
      if (menu.menuItem.callback) {
        topLevelMenuItemProps = {
          onClick: () => menu.menuItem.callback(this)
        };
      }

      return (
        <Menu.Item
          key={index}
          color='red'
          name={name}
          {...topLevelMenuItemProps}
        >
          <Icon name={menu.menuItem.icon}/>
          {menu.menuItem.caption}
          {this.createAllSubMenuLinks(menu.subMenu)}
        </Menu.Item>
      );
    });
  }

  render() {
    const {
      navbarIsVisible
    } = this.state;

    if (navbarIsVisible) {
      return (
        <Menu
          style={{ minHeight: '100% !important' }}
          styleName='no-margins-or-padding'
          inverted
          vertical
        >

          <Image centered size='small' src={Logo}/>
          {this.createSideMenu()}

        </Menu>
      );
    }

    return null;
  }
}
