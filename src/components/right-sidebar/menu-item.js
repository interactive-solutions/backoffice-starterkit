import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Menu,
  Grid
} from 'semantic-ui-react';
import './style/right-sidebar.scss';

export const MenuItem = ({ text, icon, callback }) => (
  <Menu.Item link styleName='menu-item' onClick={callback}>
    <Grid stretched>
      <Grid.Column width='14' textAlign='left'>
        {text}
      </Grid.Column>
      <Grid.Column width='2'>
        <Icon name={icon}/>
      </Grid.Column>
    </Grid>
  </Menu.Item>
);

MenuItem.propTypes = {
  callback: PropTypes.func,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
