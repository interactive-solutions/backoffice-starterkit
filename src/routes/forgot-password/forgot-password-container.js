import { connect } from 'react-redux';
import { ForgotPassword } from './forgot-password';
import { push } from 'react-router-redux';

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path))
});

export const ForgotPasswordContainer =
  connect(
    null,
    mapDispatchToProps,
  )(ForgotPassword);
