import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Image,
  Container
} from 'semantic-ui-react';
import Logo from 'assets/svg/is_tab_white.svg';
import { Header, RightSidebar } from 'components';
import { Footer } from 'components/footer/footer';
import { Sticky } from 'components/sticky/sticky';
import { Toastrs } from 'components/toastrs/toastrs';
import { sideMenuContent } from './side-menu-content';
import { MinifiedNavbar } from './small-navbar';
import { TopLevelMenuItem } from './top-level-menu-item';
import { SubMenu } from './submenu';
import { SubMenuLink } from './submenu-link';
import './style/navbar.scss';

export class Navbar extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    // location: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'Dashboard',
      navbarIsVisible: true,
      rightSidebarIsVisible: false
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
    <SubMenuLink onClick={this.setActiveItem} activeItem={this.state.activeItem} text={text}/>
  )

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
        <TopLevelMenuItem
          key={index}
          name={name}
          topLevelMenuItemProps={topLevelMenuItemProps}
          icon={menu.menuItem.icon}
          caption={menu.menuItem.caption}
        >
          {this.createAllSubMenuLinks(menu.subMenu)}
        </TopLevelMenuItem>
      );
    });
  }

  toggleNavbar = () => {
    this.setState({ navbarIsVisible: !this.state.navbarIsVisible });
  }

  toggleRightSidebar = () => {
    this.setState({ rightSidebarIsVisible: !this.state.rightSidebarIsVisible });
  }

  render() {
    const {
      navbarIsVisible,
      rightSidebarIsVisible
    } = this.state;

    const navbarStyles = `no-margins-or-padding min-height-100${navbarIsVisible ? ' navbar' : ' invisible-navbar'}`;

    return (
      <div id='navbar-container' styleName='flex min-height-100'>
        <div id='navbar' styleName='flex min-height-100'>
          <Menu
            styleName={navbarStyles}
            inverted
            vertical
          >

            <Image centered size='small' src={Logo}/>
            {this.createSideMenu()}

          </Menu>

          <MinifiedNavbar
            visible={!navbarIsVisible}
            activeItem={this.state.activeItem}
            logout={this.props.logout}
            history={this.props.history}
          />
        </div>

        <div styleName='flex-1 min-height-100'>
          <Header
              callback={this.toggleNavbar}
              toggleRightSidebar={this.toggleRightSidebar}
              title='Interactive Solutions'
          />
          <Sticky>
            <RightSidebar
              visible={rightSidebarIsVisible}
              toggleRightSidebar={this.toggleRightSidebar}
            />
            <Toastrs/>
          </Sticky>
          <Container fluid styleName='main-container'>
            {this.props.children}
          </Container>
          <Footer/>
        </div>
      </div>
    );
  }
}
