import React from 'react';
import PropTypes from 'prop-types';
import { AlertModal } from 'components/modals';

export const CoreLayout = ({ children }) => (
  <div style={{ height: '100%' }}>
    {children}
    <AlertModal/>
  </div>
);
CoreLayout.propTypes = {
  children: PropTypes.node
};
