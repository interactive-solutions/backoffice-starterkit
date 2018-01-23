import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Menu,
  Sidebar,
  Segment,
  Button
} from 'semantic-ui-react';

export class RightSidebar extends React.Component {
  render() {
    const { visible } = this.props;
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            visible={visible}
            icon='labeled'
            vertical
            className='right-sidebar'
          >
            <Button.Group attached='top' widths={2}>
              <Button>One</Button>
              <Button icon><Icon name='setting'/></Button>
            </Button.Group>
            <Segment attached>
              <Menu.Item name='settings'>
                <Segment basic compact size='huge' className='basic-compact-segment'>
                  <Icon name='setting'/>
                  Settings
                </Segment>
                <Segment basic compact className='basic-compact-segment'>
                  Manage your account
                </Segment>
              </Menu.Item>

              <Menu.Item name='change-password'>
                <Segment basic compact size='huge' className='basic-compact-segment'>
                  Change password
                  <Icon name='plus'/>
                </Segment>
              </Menu.Item>
            </Segment>
          </Sidebar>
          <Sidebar.Pusher>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

RightSidebar.propTypes = {
  children: PropTypes.array,
  visible: PropTypes.bool.isRequired
};
