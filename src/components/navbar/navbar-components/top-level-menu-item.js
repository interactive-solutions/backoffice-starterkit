import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Header } from 'semantic-ui-react';
import { SubMenu } from './submenu';
import './style/top-level-menu-item.scss';

export const TopLevelMenuItem = (props) => {
  const { subMenuContent, small } = props;

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
          name={props.name}
          {...(props.topLevelMenuItemProps)}
        >
          <Icon name={props.icon}/>
          {props.caption}
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
          name={props.name}
          {...(props.topLevelMenuItemProps)}
        >
          <Header as='h2' textAlign='center' inverted styleName={smallMenuItemStyle}>
            <div styleName='centered-icon'>
              <Icon fitted name={props.icon} size='large'/>
            </div>
          </Header>
          <SubMenu subMenuContent={subMenuContent}/>
        </Menu.Item>
      </div>
    </React.Fragment>
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
