import { push } from 'react-router-redux';
import { openModal } from 'redux/modules/modal';
import { connect } from 'react-redux';
import { ResetPassword } from './reset-password';

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  openModal: (header, content) => dispatch(openModal(header, content))
});

export default connect(
  null,
  mapDispatchToProps,
)(ResetPassword);
