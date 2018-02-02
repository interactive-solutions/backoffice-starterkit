import React from 'react';
import PropTypes from 'prop-types';
import { WarningModal } from 'components/modals/warning-modal';
import { Notifications } from 'components/notifications/notifications';

export const CoreLayout = ({ children }) => (
  <div style={{ height: '100%' }}>
    {children}
    <WarningModal/>
  </div>
);
CoreLayout.propTypes = {
  children: PropTypes.node
};
