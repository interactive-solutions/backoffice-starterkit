import { openModal } from 'redux/modules/modal';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { ForgotPassword } from './forgot-password';

const mapStateToProps = (state) => ({
  user: state.user.user
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  openModal: (header, content) => dispatch(openModal(header, content))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
