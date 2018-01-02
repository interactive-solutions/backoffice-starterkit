import { connect } from 'react-redux';
import { Login } from './login';
import { push } from 'react-router-redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path))
});

export const LoginContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login);
