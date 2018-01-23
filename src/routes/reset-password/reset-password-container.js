import { connect } from 'react-redux';
import { ResetPassword } from './reset-password';
import { push } from 'react-router-redux';
import { openModal } from 'redux/modules/modal';

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  openModal: (header, content) => dispatch(openModal(header, content))
});

export const ResetPasswordContainer =
  connect(
    null,
    mapDispatchToProps,
  )(ResetPassword);
