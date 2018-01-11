import { connect } from 'react-redux';
import { Login } from './login';
import { push } from 'react-router-redux';
import {
  resolveUser,
  openModal
} from 'redux/actions';

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  resolveUser: () => dispatch(resolveUser()),
  openModal: (header, content, buttonText) =>
    dispatch(openModal(header, content, buttonText))
});

export const LoginContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login);
