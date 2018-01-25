import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Sidebar, Image, Header } from 'semantic-ui-react';
import { sideMenuContent } from './side-menu-content';
import Logo from 'assets/svg/is_tab_white.svg';

export class MinifiedNavbar extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    activeItem: PropTypes.string,
    logout: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      activeItem: this.props.activeItem
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeItem) {
      this.setState({ activeItem: nextProps.activeItem });
    }
  }

  createSideMenu() {
    if (sideMenuContent) {
      return sideMenuContent.map((menu, index) => {
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
            name={menu.menuItem.caption}
            ink={menu.menuItem.link}
            {...topLevelMenuItemProps}
          >
            <Header as='h2' textAlign='center' inverted>
              <div className='centered-icon'>
                <Icon name={menu.menuItem.icon} size='large' fitted/>
              </div>
            </Header>
          </Menu.Item>
        );
      });
    }
  }

  setActiveItem =(e, { name }) => {
    e.stopPropagation();
    this.setState({ activeItem: name });
    this.props.history.push(name.toLowerCase().replace(' ', ''));
  }

  render() {
    const { visible } = this.props;

    return (
      <Sidebar
        size='very thin'
        as={Menu}
        inverted
        visible={visible}
        vertical
        animation='slide along'
      >
        <Image centered size='small' src={Logo}/>
        {this.createSideMenu()}
      </Sidebar>
    );
  }
}
