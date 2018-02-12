import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';
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

    const iconStyle = small ? 'icon enlargeIcon' : 'icon';
    const captionStyle = small ? 'caption shrinkCaption' : 'caption';
    // const topLevelMenuItemStyle = small ? 'topLevelMenuItem shrinkTopLevelMenuItem' : 'topLevelMenuItem';

    return (
      <Menu.Item
        id='top-level-menu-item'
        color='red'
        name={this.props.name}
        {...(this.props.topLevelMenuItemProps)}
        // styleName={topLevelMenuItemStyle}
      >
        <Icon fitted styleName={iconStyle} name={this.props.icon}/>
        <span styleName={captionStyle}>
          {this.props.caption}
        </span>
        <SubMenu subMenuContent={subMenuContent}/>
      </Menu.Item>
    );
  }
}
