import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Menu,
  Sidebar,
  Segment,
  Button,
  Tab
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logout } from 'redux/modules/user';
import './style/right-sidebar.scss';

class RightSidebar extends React.Component { // eslint-disable-line
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
            <Menu.Item name='settings' styleName='sidebar-item'>
              <Segment basic compact size='massive' styleName='basic-compact-segment'>
                <Icon name='setting'/>
                Settings
              </Segment>
              <Segment basic compact styleName='basic-compact-segment'>
                Manage your account
              </Segment>
            </Menu.Item>

            <Menu.Item name='change-password' styleName='sidebar-item'>
              <Segment basic compact size='big' styleName='basic-compact-segment'>
                Change password <Icon name='plus'/>
              </Segment>
            </Menu.Item>

            <Menu.Item name='logout' styleName='sidebar-item' onClick={this.props.logout}>
              <Segment basic compact size='big' styleName='basic-compact-segment'>
                Log out <Icon name='log out'/>
              </Segment>
            </Menu.Item>
          </Tab.Pane>
        )
      }
    ];

    return (
      <Sidebar.Pushable as={Segment} styleName='right-sidebar-container'>
        <Sidebar
          as={Menu}
          animation='overlay'
          direction='right'
          visible={visible}
          icon='labeled'
          vertical
          styleName='right-sidebar'
        >
          <Tab panes={panes} styleName='sidebar-tab'/>
        </Sidebar>
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
