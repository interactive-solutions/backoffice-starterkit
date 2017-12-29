import { connect } from 'react-redux';
import { Login } from './login';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
});

export const LoginContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login);
