import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from 'components/footer/footer';

export const CoreLayout = ({ children }) => (
  <div style={{ height: '100%' }}>
    {children}
    <Footer/>
  </div>
);
CoreLayout.propTypes = {
  children: PropTypes.node
};
