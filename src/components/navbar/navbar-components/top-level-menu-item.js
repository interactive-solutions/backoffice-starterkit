import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';
import { SubMenu } from './submenu';
import './style/top-level-menu-item.scss';

export const TopLevelMenuItem = (props) => {
  const { subMenuContent, small } = props;

  const topLevelMenuItemStyle = small ? 'topLevelMenuItem shrinkTopLevelMenuItem' : 'topLevelMenuItem';
  const captionStyle = small ? 'caption shrinkCaption' : 'caption';
  const iconStyle = small ? 'icon enlargeIcon' : 'icon';

  return (
    <Menu.Item
      id='top-level-menu-item'
      color='red'
      name={props.name}
      {...(props.topLevelMenuItemProps)}
      styleName={topLevelMenuItemStyle}
    >
      <div styleName='flex'>
        <div styleName={captionStyle}>
          {props.caption}
        </div>
        <div styleName={iconStyle}>
          <Icon name={props.icon}/>
        </div>
      </div>
      <SubMenu subMenuContent={subMenuContent}/>
    </Menu.Item>
  );
};

TopLevelMenuItem.propTypes = {
  children: PropTypes.object,
  name: PropTypes.string.isRequired,
  topLevelMenuItemProps: PropTypes.object.isRequired,
  icon: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  subMenuContent: PropTypes.object,
  small: PropTypes.bool.isRequired
};
