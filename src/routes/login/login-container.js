import { connect } from 'react-redux';
// import { pathConstants } from '../../pathConstants';
import { Login } from './login';
/* import {
  loginThunk,
  navigateThunk
} from '../../redux';
*/

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
//  onSubmit: (username, password) => dispatch(loginThunk(username, password)),
//  onResetPasswordClick: () => dispatch(navigateThunk(pathConstants.RESET_PASSWORD))
});

export const LoginContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login);
