import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar, Segment, Image, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from 'redux/modules/user';
import Logo from 'assets/svg/is_tab_white.svg';
import { Header, RightSidebar } from 'components';
import { Footer } from 'components/footer/footer';
import { sideMenuContent } from './side-menu-content';
import { MinifiedNavbar } from './small-navbar';
import './style/navbar.scss';

class Navbar extends Component {
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
      sidebarIsVisible: true,
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
      return;
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

  setActiveItem = (e, { name }) => {
    e.stopPropagation();
    this.setState({ activeItem: name });
    this.props.history.push(name.toLowerCase().replace(' ', ''));
  }

  toggleVisibility = () => {
    this.setState({ sidebarIsVisible: !this.state.sidebarIsVisible });
  }

  toggleRightSidebar = () => {
    this.setState({ rightSidebarIsVisible: !this.state.rightSidebarIsVisible });
  }

  render() {
    const {
      sidebarIsVisible,
      rightSidebarIsVisible
    } = this.state;

    return (
      <Sidebar.Pushable styleName='navbar' as={Segment}>

        <Sidebar
          styleName='sidebar'
          as={Menu}
          inverted
          visible={sidebarIsVisible}
          vertical
          animation='push'
        >

          <Image centered size='small' src={Logo}/>
          {this.createSideMenu()}

        </Sidebar>

        <MinifiedNavbar
          visible={!sidebarIsVisible}
          activeItem={this.state.activeItem}
          logout={this.props.logout}
          history={this.props.history}
        />

        <Sidebar.Pusher>
          <div styleName='full-height'>
            <Container fluid styleName={sidebarIsVisible ? 'padded-header-visible' : 'padded-header-invisible'}>
              <Header callback={this.toggleVisibility} toggleRightSidebar={this.toggleRightSidebar} title='Interactive Solutions'/>
              <RightSidebar visible={rightSidebarIsVisible}>
                <Container fluid styleName='main-container'>
                  {this.props.children}
                </Container>
                <Footer/>
              </RightSidebar>
            </Container>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

// -----------------------
// NavbarContainer
// -----------------------

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const NavbarContainer =
  connect(
    null,
    mapDispatchToProps,
  )(Navbar);

export const RoutingNavbar = withRouter(NavbarContainer);
