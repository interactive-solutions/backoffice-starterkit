import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar, Image, Header } from 'semantic-ui-react';
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
        const topLevelMenuItemProps = {
          active: menu.menuTitle.caption === this.state.activeItem,
          onClick: this.setActiveItem
        };

        return (
          <Menu.Item color="red" name={menu.menuTitle.caption} {...topLevelMenuItemProps}>
            <Header as="h2" textAlign="center" inverted>
              <Icon name={menu.menuTitle.icon} size="small" fitted/>
            </Header>
          </Menu.Item>
        );
      });
    }
  }

  setActiveItem = (e, { name }) => {
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
      >
        <Image centered size="small" src="/assets/images/logo.png"/>
        {this.createSideMenu()}
      </Sidebar>
    );
  }
}
