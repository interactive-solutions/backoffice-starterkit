import { connect } from 'react-redux';
import { ForgotPassword } from './forgot-password';
import { push } from 'react-router-redux';
import { resetPassword } from 'redux/actions';

/* const mapStateToProps = (state) => ({
  user: state.user.user
}); */

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  resetPassword: () => dispatch(resetPassword())
});

export const ForgotPasswordContainer =
  connect(
    undefined, // mapStateToProps,
    mapDispatchToProps,
  )(ForgotPassword);
