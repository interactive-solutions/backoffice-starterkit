import React from 'react';
import PropTypes from 'prop-types';
import { WarningModal } from 'components/modals/warning-modal';
import { Notification } from 'components/notification/notification';

export const CoreLayout = ({ children }) => (
  <div style={{ height: '100%' }}>
    {children}
    <WarningModal/>
    <Notification/>
  </div>
);
CoreLayout.propTypes = {
  children: PropTypes.node
};
