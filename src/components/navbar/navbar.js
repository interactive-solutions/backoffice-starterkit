import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar, Segment, Image, Container } from 'semantic-ui-react';
import { sideMenuJson } from './sideMenuJson';
import { Footer } from 'components/footer/footer';
import { Header } from 'components';
import { MinifiedNavbar } from './small-navbar';

export class Navbar extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeItem: null,
      sidebarIsVisible: true
    };
  }

  createSubMenuLink = (text) => {
    return (
      <Menu.Item
        key={text}
        color="red"
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
    if (sideMenuJson) {
      return sideMenuJson.map((menu, index) => {
        const name = menu.menuTitle.caption;
        let topLevelMenuItemProps = {};

        const active = menu.menuTitle.caption === this.state.activeItem;

        if (menu.menuTitle.link) {
          topLevelMenuItemProps = {
            active: active,
            onClick: this.setActiveItem
          };
        }

        return (
          <Menu.Item
            key={index}
            color="red"
            name={name}
            {...topLevelMenuItemProps}
          >
            <Icon name={menu.menuTitle.icon}/>
            {menu.menuTitle.caption}
            {this.createAllSubMenuLinks(menu.subMenu)}
          </Menu.Item>
        );
      });
    }
  }

  setActiveItem =(e, { name }) => {
    e.stopPropagation();
    this.setState({ activeItem: name });
  }

  toggleVisibility = () => {
    this.setState({ sidebarIsVisible: !this.state.sidebarIsVisible });
  }

  render() {
    const { sidebarIsVisible } = this.state;

    return (
      <Sidebar.Pushable className="navbar" as={Segment}>
        <Sidebar
          as={Menu}
          inverted
          visible={sidebarIsVisible}
          vertical
          animation="push"
        >
          <Image centered size="small" src="/assets/images/logo.png"/>
          {this.createSideMenu()}
        </Sidebar>
        <MinifiedNavbar visible={!sidebarIsVisible}/>
        <Sidebar.Pusher>
          <Container fluid className={sidebarIsVisible ? 'padded-header-visible' : 'padded-header-invisible'}>
            <Header callback={this.toggleVisibility} title="Interactive Solutions"/>
            <Container fluid className="side-padded ">
              {this.props.children}
            </Container>
            <Footer/>
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
