import { WarningModalWrapper } from './warning-modal';
import { connect } from 'react-redux';
import { closeModal } from 'redux/actions';

const mapStateToProps = (state) => ({
  modal: state.modal.modal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export const WarningModalContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WarningModalWrapper);
