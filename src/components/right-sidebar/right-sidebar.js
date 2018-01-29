import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Menu,
  Sidebar,
  Segment,
  Button,
  Tab
  // Sticky,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from 'redux/modules/user';
import { MenuItem } from './menu-item';
import './style/right-sidebar.scss';

class RightSidebar extends React.Component { // eslint-disable-line
  state = {}

  // handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const { visible } = this.props;

    const panes = [
      {
        menuItem: <Button key='tab1' styleName='tab-selector'>Notifications</Button>,
        render: () => <Tab.Pane styleName='tab-pane'>Tab 1 Content</Tab.Pane>
      },
      {
        menuItem: <Button key='tab2' icon='setting' styleName='tab-selector'/>,
        render: () => (
          <Tab.Pane styleName='tab-pane'>
            <Menu.Item name='settings' styleName='menu-item'>
              <Segment basic compact size='massive' styleName='basic-compact-segment'>
                <Icon name='setting'/>
                Settings
              </Segment>
              <Segment basic compact styleName='basic-compact-segment'>
                Manage your account
              </Segment>
            </Menu.Item>

            <MenuItem text='Change password' icon='plus'/>
            <MenuItem text='Log out' icon='log out' callback={this.props.logout}>
              a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            </MenuItem>
          </Tab.Pane>
        )
      }
    ];

    return (
      <Sidebar.Pushable as={Segment} styleName='right-sidebar-container'>
        <div ref={this.handleContextRef}>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            visible={visible}
            icon='labeled'
            vertical
            styleName='right-sidebar'
          >
            {/* <Sticky context={this.state.contextRef}> */}
            <Tab panes={panes} styleName='sidebar-tab'/>
            {/* </Sticky> */}
          </Sidebar>
        </div>
        <Sidebar.Pusher>
          {this.props.children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}

RightSidebar.propTypes = {
  children: PropTypes.array,
  visible: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
    dispatch(push('login'));
  }
});

const RightSidebarContainer =
  connect(
    null,
    mapDispatchToProps,
  )(RightSidebar);

export { RightSidebarContainer as RightSidebar };
