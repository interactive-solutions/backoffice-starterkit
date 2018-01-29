import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Menu,
  Grid,
  Segment
} from 'semantic-ui-react';
import './style/right-sidebar.scss';

export const MenuItem = ({ text, icon, callback, children }) => (
  <div>
    <Menu.Item link styleName='menu-item' onClick={callback}>
      <Grid stretched>
        <Grid.Row styleName='grid-column'>
          <Grid.Column width='14' textAlign='left'>
            {text}
          </Grid.Column>
          <Grid.Column width='2'>
            <Icon name={icon}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Menu.Item>
    {
      children ?
        <Segment basic width='16' textAlign='left' styleName='menu-item-form' style={{ paddingTop: '0px', marginTop: '0px' }}>
          {children || null}
        </Segment> :
        null
    }
  </div>
);

MenuItem.propTypes = {
  callback: PropTypes.func,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
