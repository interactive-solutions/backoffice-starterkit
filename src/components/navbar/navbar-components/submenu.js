import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

export const SubMenu = (props) => {
  const { subMenuContent, setActiveItem, activeItem } = props;

  if (!subMenuContent || subMenuContent.length === 0) {
    return null;
  }

  return (
    <Menu.Item>
      {subMenuContent.map((text, index) => (
        <Menu.Item
          key={index}
          color='red'
          name={text}
          active={activeItem === text}
          onClick={setActiveItem}
        >
          {text}
        </Menu.Item>
      ))}
    </Menu.Item>
  );
};

SubMenu.propTypes = {
  subMenuContent: PropTypes.object,
  setActiveItem: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired
};
