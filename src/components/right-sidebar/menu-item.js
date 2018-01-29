import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Menu,
  Grid
} from 'semantic-ui-react';
import './style/right-sidebar.scss';

export const MenuItem = ({ text, icon, callback, children }) => (
  <Menu.Item link styleName='menu-item' onClick={callback}>
    <Grid styleName='grid' stretched>
      <Grid.Row>
        <Grid.Column width='14' textAlign='left'>
          {text}
        </Grid.Column>
        <Grid.Column width='2'>
          <Icon name={icon}/>
        </Grid.Column>
        <Grid.Column width='16' textAlign='left'>
          {children || null}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Menu.Item>
);

MenuItem.propTypes = {
  callback: PropTypes.func,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
