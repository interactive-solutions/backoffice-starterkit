import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar, Segment, Image } from 'semantic-ui-react';
import { sideMenuJson } from './sideMenuJson';
import { Footer } from 'components/footer/footer';

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

  createAllSubMenuLinks = (textArray) => {
    if (!textArray || textArray.length === 0) {
      return null;
    }
    return (
      <Menu.Menu>
        {textArray.map(this.createSubMenuLink)}
      </Menu.Menu>
    );
  }

  createSideMenu() {
    if (sideMenuJson) {
      return sideMenuJson.map((menu) => {
        const name = menu.menuTitle.caption;
        let topLevelMenuItemProps = {};

        if (menu.menuTitle.link) {
          topLevelMenuItemProps = {
            active: menu.menuTitle.caption === this.state.activeItem,
            onClick: this.setActiveItem
          };
        }

        return (
          <Menu.Item color="red"
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
          onClick={this.toggleVisibility}
        >
          <Image centered size="small" src="/assets/images/logo.png"/>
          {this.createSideMenu()}
        </Sidebar>
        {this.props.children}
        <Footer/>
      </Sidebar.Pushable>
    );
  }
}
