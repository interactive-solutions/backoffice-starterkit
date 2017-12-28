import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';

export class DashHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  };

  constructor(props) { // eslint-disable-line
    super(props);
    // this.props.onGetEntries(params);
  }

  render() {
    return (
      <div className="main-header">
        <div className="p30 pl40 pr40 m0">
          <Header as="h2" className="m0 float-left">
            <Icon name={this.props.icon}/>
            <Header.Content>
              <div className="logo"/>
              {this.props.title}
            </Header.Content>
          </Header>
          <div className="clear"/>
        </div>
      </div>
    );
  }
}
