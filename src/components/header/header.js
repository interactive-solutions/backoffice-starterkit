import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Image, Menu } from 'semantic-ui-react';

export class DashHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <Menu>
        <Menu.Item position="right" className="logo">
          <Header as="h2" textAlign="center" style={{ backgroundColor: 'transparent' }}>
            <Image src="assets/images/logo.png" size="mini"/>
            {this.props.title}
          </Header>
        </Menu.Item>
      </Menu>
    );
  }
}
