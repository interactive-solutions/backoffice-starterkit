import { connect } from 'react-redux';
import { ForgotPassword } from './forgot-password';
import { push } from 'react-router-redux';
import {
  openModal
} from 'redux/actions';

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  openModal: (header, content) =>
    dispatch(openModal(header, content))
});

export const ForgotPasswordContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ForgotPassword);
