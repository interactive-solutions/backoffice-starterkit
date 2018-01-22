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
              <Button>Two</Button>
            </Button.Group>
            <Segment attached>
              <Menu.Item name='home'>
                <Icon name='home'/>
                Home
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Icon name='gamepad'/>
                Games
              </Menu.Item>
              <Menu.Item name='camera'>
                <Icon name='camera'/>
                Channels
              </Menu.Item>
              <Menu.Item name='home'>
                <Icon name='home'/>
                Home
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Icon name='gamepad'/>
                Games
              </Menu.Item>
              <Menu.Item name='camera'>
                <Icon name='camera'/>
                Channels
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
