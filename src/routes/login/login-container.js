import { connect } from 'react-redux';
import { Login } from './login';
import { push } from 'react-router-redux';
import { resolveUser } from 'redux/modules/user';
import { openModal } from 'redux/modules/modal';

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  resolveUser: () => dispatch(resolveUser()),
  openModal: (header, content) => dispatch(openModal(header, content))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
