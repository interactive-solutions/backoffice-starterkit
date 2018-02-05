/**
 * This component is the container that
 * contains all the single Toastr components.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toastr } from '../toastr/toastr';
import './style/toastrs.scss';

// ---------------------------------
// Toastrs
// ---------------------------------

const Toastrs = ({ toastrs }) => (
  <div styleName='toastrs'>
    {Object.values(toastrs).map(n => (
      <Toastr toastr={n}/>
    ))}
  </div>
);

Toastrs.propTypes = {
  toastrs: PropTypes.object
};

// ---------------------------------
// ToastrsContainer
// ---------------------------------

const mapStateToProps = (state) => ({
  toastrs: state.toastr.toastrs
});

const ToastrsContainer =
  connect(
    mapStateToProps,
    null,
  )(Toastrs);

export { ToastrsContainer as Toastrs };
