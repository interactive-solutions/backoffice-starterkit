import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeModal as closeModalAction } from 'redux/modules/modal';
import './style/modal.scss';

/**
 * A simple warning modal that essentially mimics the
 * behaviour of window.alert.
 */
const WarningModal = ({ modal, closeModal }) => {
  if (!modal) {
    /**
     * modal === null means that there is no modal
     * so don't draw it.
     */
    return null;
  }

  return (
    <Modal open size='tiny' styleName='modal-body'>
      <Icon color='red' name='warning circle' size='massive'/>
      <h2>{modal.header}</h2>
      <div styleName='modal-content-text'>{modal.content}</div>
      <Button
        color='red'
        inverted
        onClick={closeModal}
        size='big'
      >
        Ok
      </Button>
    </Modal>
  );
};

WarningModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modal: PropTypes.object
};

// ---------------------------------
// WarningModalContainer
// ---------------------------------

const mapStateToProps = (state) => ({
  modal: state.modal.modal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModalAction())
});

const WarningModalContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WarningModal);

export { WarningModalContainer as WarningModal };
