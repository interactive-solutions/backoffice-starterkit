import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar, Image } from 'semantic-ui-react';
import { sideMenuJson } from './sideMenuJson';

export class MinifiedNavbar extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeItem: null
    };
  }

  createSideMenu() {
    if (sideMenuJson) {
      return sideMenuJson.map((menu) => {
        let topLevelMenuItemProps = {};

        if (menu.menuTitle.link) {
          topLevelMenuItemProps = {
            active: menu.menuTitle.caption === this.state.activeItem,
            onClick: this.setActiveItem
          };
        }
        return (
          <Menu.Item color="red"
            {...topLevelMenuItemProps}>
            <Icon name={menu.menuTitle.icon} size="large" fitted/>
          </Menu.Item>
        );
      });
    }
  }

  setActiveItem =(e, { name }) => {
    e.stopPropagation();
    this.setState({ activeItem: name });
  }

  render() {
    const { visible } = this.props;

    return (
      <Sidebar
        size="very thin"
        as={Menu}
        inverted
        visible={visible}
        vertical
        animation="slide along"
        attached
        onClick={this.toggleVisibility}
      >
        <Image centered size="small" src="/assets/images/logo.png"/>
        {this.createSideMenu()}
      </Sidebar>
    );
  }
}
