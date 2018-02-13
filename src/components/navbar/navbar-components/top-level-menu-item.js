import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Header } from 'semantic-ui-react';
import { SubMenu } from './submenu';
import './style/top-level-menu-item.scss';

export class TopLevelMenuItem extends Component { // eslint-disable-line
  static propTypes = {
    children: PropTypes.object,
    name: PropTypes.string.isRequired,
    topLevelMenuItemProps: PropTypes.object.isRequired,
    icon: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    setActiveItem: PropTypes.func.isRequired,
    subMenuContent: PropTypes.object,
    small: PropTypes.bool.isRequired
  }

  render() {
    const { subMenuContent, small } = this.props;

    const iconStyle = 'icon'; // small ? 'icon enlargeIcon' : 'icon';
    const captionStyle = 'caption'; // small ? 'caption shrinkCaption' : 'caption';
    const topLevelMenuItemStyle = small ? 'topLevelMenuItem shrinkTopLevelMenuItem' : 'topLevelMenuItem';
    const smallMenuItemStyle = small ? 'smallMenuItem' : 'smallMenuItem shrunkSmallMenuItem';

    return (
      <React.Fragment>
        {/*
          * For big menu.
          */}
        <div styleName={topLevelMenuItemStyle}>
          <Menu.Item
            id='top-level-menu-item'
            color='red'
            name={this.props.name}
            {...(this.props.topLevelMenuItemProps)}
          >
            <Icon name={this.props.icon}/>
            {this.props.caption}
            <SubMenu subMenuContent={subMenuContent}/>
          </Menu.Item>
        </div>

        {/*
          * For small menu.
          */}
        <div styleName={smallMenuItemStyle}>
          <Menu.Item
            id='top-level-menu-item'
            color='red'
            name={this.props.name}
            {...(this.props.topLevelMenuItemProps)}
          >
            <Header as='h2' textAlign='center' inverted styleName={smallMenuItemStyle}>
              <div styleName='centered-icon'>
                <Icon fitted name={this.props.icon} size='large'/>
              </div>
            </Header>
            <SubMenu subMenuContent={subMenuContent}/>
          </Menu.Item>
        </div>
      </React.Fragment>
    );
  }
}
