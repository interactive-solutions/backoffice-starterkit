import { connect } from 'react-redux';
import { ForgotPassword } from './forgot-password';
import { push } from 'react-router-redux';
import { resolveUser } from 'redux/actions';

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  resolveUser: () => dispatch(resolveUser())
});

export const ForgotPasswordContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ForgotPassword);
