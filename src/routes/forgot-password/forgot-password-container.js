import { connect } from 'react-redux';
import { ForgotPassword } from './forgot-password';
import { push } from 'react-router-redux';
import { resetPassword } from 'redux/actions';

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  resetPassword: () => dispatch(resetPassword())
});

export const ForgotPasswordContainer =
  connect(
    undefined, // mapStateToProps,
    mapDispatchToProps,
  )(ForgotPassword);
