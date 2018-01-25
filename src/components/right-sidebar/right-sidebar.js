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

export class RightSidebar extends React.Component {
  render() {
    const { visible } = this.props;

    const panes = [
      {
        menuItem: <Button key='tab1' className='tab-selector'>Notifications</Button>,
        render: () => <Tab.Pane className='tab-pane'>Tab 1 Content</Tab.Pane>
      },
      {
        menuItem: <Button key='tab2' icon='setting' className='tab-selector'/>,
        render: () => (
          <Tab.Pane className='tab-pane'>
            <Menu.Item name='settings' className='sidebar-item'>
              <Segment basic compact size='massive' className='basic-compact-segment'>
                <Icon name='setting'/>
                Settings
              </Segment>
              <Segment basic compact className='basic-compact-segment'>
                Manage your account
              </Segment>
            </Menu.Item>

            <Menu.Item name='change-password' className='sidebar-item'>
              <Segment basic compact size='huge' className='basic-compact-segment'>
                Change password <Icon name='plus'/>
              </Segment>
            </Menu.Item>
          </Tab.Pane>
        )
      }
    ];

    return (
      <Sidebar.Pushable as={Segment} style={{ marginTop: '0' }}>
        <Sidebar
          as={Menu}
          animation='overlay'
          direction='right'
          visible={visible}
          icon='labeled'
          vertical
          className='right-sidebar'
        >
          <Tab panes={panes} className='sidebar-tab'/>
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
  visible: PropTypes.bool.isRequired
};
