import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar, Segment, Image, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { sideMenuContent } from './side-menu-content';
import { Footer } from 'components/footer/footer';
import { Header } from 'components';
import { MinifiedNavbar } from './small-navbar';

export class Navbar extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeItem: 'Dashboard',
      sidebarIsVisible: true
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
      let activeItem = path.charAt(1).toUpperCase() + path.slice(2);
      this.setState({ activeItem: activeItem });
    }
  }

  /**
   * Create a single menu item.
   *
   * @param text What is displayed on the menu item.
   */
  createSubMenuLink = (text) => {
    return (
      <Menu.Item
        key={text}
        color='red'
        name={text}
        active={this.state.activeItem === text}
        onClick={this.setActiveItem}>
        {text}
      </Menu.Item>
    );
  }

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
   * @param sideMenuContent The side-menu in JSON format
   */
  createSideMenu(sideMenuContent) {
    if (!sideMenuContent) {
      return;
    }

    return sideMenuContent.map((menu, index) => {
      const name = menu.menuItem.caption;
      let topLevelMenuItemProps = {};

      const active = menu.menuItem.caption === this.state.activeItem;

      if (menu.menuItem.link) {
        topLevelMenuItemProps = {
          active: active,
          onClick: this.setActiveItem
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

  setActiveItem =(e, { name }) => {
    e.stopPropagation();
    this.setState({ activeItem: name });
    this.props.history.push(name.toLowerCase().replace(' ', ''));
  }

  toggleVisibility = () => {
    this.setState({ sidebarIsVisible: !this.state.sidebarIsVisible });
  }

  render() {
    const { sidebarIsVisible } = this.state;

    return (
      <Sidebar.Pushable className='navbar' as={Segment}>

        <Sidebar
          className='sidebar'
          as={Menu}
          inverted
          visible={sidebarIsVisible}
          vertical
          animation='push'
        >

          <Image centered size='small' src='/assets/images/logo.png'/>
          {this.createSideMenu(sideMenuContent)}

        </Sidebar>

        <MinifiedNavbar visible={!sidebarIsVisible} activeItem={this.state.activeItem}/>

        <Sidebar.Pusher>
          <div className='full-height'>
            <Container fluid className={sidebarIsVisible ? 'padded-header-visible' : 'padded-header-invisible'}>
              <Header callback={this.toggleVisibility} title='Interactive Solutions'/>
              <Container fluid className='main-container'>
                {this.props.children}
              </Container>
              <Footer/>
            </Container>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export const RoutingNavbar = withRouter(Navbar);
