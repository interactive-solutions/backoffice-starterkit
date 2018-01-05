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

  createSideMenu() {
    if (sideMenuContent) {
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
  }

  setActiveItem =(e, { name }) => {
    e.stopPropagation();
    this.setState({ activeItem: name });
    this.props.history.push(name.toLowerCase());
  }

  toggleVisibility = () => {
    this.setState({ sidebarIsVisible: !this.state.sidebarIsVisible });
  }

  render() {
    const { sidebarIsVisible } = this.state;

    return (
      <Sidebar.Pushable className='navbar' as={Segment}>
        <Sidebar
          as={Menu}
          inverted
          visible={sidebarIsVisible}
          vertical
          animation='push'
        >
          <Image centered size='small' src='/assets/images/logo.png'/>
          {this.createSideMenu()}
        </Sidebar>
        <MinifiedNavbar visible={!sidebarIsVisible} activeItem={this.state.activeItem}/>
        <Sidebar.Pusher>
          <Container fluid className={sidebarIsVisible ? 'padded-header-visible' : 'padded-header-invisible'}>
            <Header callback={this.toggleVisibility} title='Interactive Solutions'/>
            <Container fluid className='side-padded '>
              {this.props.children}
            </Container>
            <Footer/>
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

export const RoutingNavbar = withRouter(Navbar);
