import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Menu, Button, Icon } from 'semantic-ui-react';

export class DashHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    callback: PropTypes.func
  };

  render() {
    return (
      <Menu>
        <Menu.Item position='left'>
          <Button
            primary
            basic
            icon
            size='big'
            onClick={this.props.callback}
          >
            <Icon name='sidebar'/>
          </Button>
        </Menu.Item>
        <Menu.Item position='right' className='logo'>
          <Header as='h2' textAlign='center' style={{ backgroundColor: 'transparent' }}>
            <Image src='assets/images/logo.png' size='mini'/>
            {this.props.title}
          </Header>
        </Menu.Item>
      </Menu>

    );
  }
}
