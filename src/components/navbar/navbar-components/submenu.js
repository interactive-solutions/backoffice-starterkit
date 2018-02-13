import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { SubMenuItem } from './submenu-item';

export const SubMenu = (props) => {
  const { subMenuContent, setActiveItem, activeItem } = props;

  if (!subMenuContent || subMenuContent.length === 0) {
    return null;
  }

  return (
    <Menu.Item>
      {subMenuContent.map((text, index) => (
        <SubMenuItem
          key={index}
          text={text}
          setActiveItem={setActiveItem}
          activeItem={activeItem}
        />
      ))}
    </Menu.Item>
  );
};

SubMenu.propTypes = {
  subMenuContent: PropTypes.object,
  setActiveItem: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired
};
