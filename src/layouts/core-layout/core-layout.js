import React from 'react';
import PropTypes from 'prop-types';

export const CoreLayout = ({ children }) => (
  <div style={{ height: '100%' }}>
    {children}
    <div className="footer">
      <b>Copyright</b> EPulze © 2015 - 2017
    </div>
  </div>
);
CoreLayout.propTypes = {
  children: PropTypes.node
};
