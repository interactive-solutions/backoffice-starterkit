import React from 'react';
import PropTypes from 'prop-types';
import { WarningModal } from 'components/modals/warning-modal';
import { FormModalContainer } from 'components/modals/form-modal';

export const CoreLayout = ({ children }) => (
  <div style={{ height: '100%' }}>
    {children}
    <WarningModal/>
    <FormModalContainer/>
  </div>
);
CoreLayout.propTypes = {
  children: PropTypes.node
};
