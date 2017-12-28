import React from 'react';
import {
  Container
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style/core-layout.scss';

export const CoreLayout = ({ children }) => (
  <Container textAlign="center">
    {children}
  </Container>
);
CoreLayout.propTypes = {
  children: PropTypes.node
};
