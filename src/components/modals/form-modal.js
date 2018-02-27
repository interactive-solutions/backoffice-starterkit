// @flow
import React from 'react';
import { connect } from 'react-redux';
import { closeModal, OPEN_CREATE_USER_MODAL } from 'redux/modules/modal';
import PropTypes from 'prop-types';
import { Modal, Icon } from 'semantic-ui-react';
import { CreateUserForm } from 'components/forms';
import './style/modal.scss';

type Props = {
  modal: {
    header: string;
    content?: string,
    form: string;
    initialValues?: Object
  };
  closeModal: Function;
}

/**
 * This draws the modal if
 * redux state says that a Modal should be drawn
 * otherwise it draws nothing.
 */
export const FormModal = (props: Props) => {
  if (props.modal) {
    return (
      <Modal open size='tiny'>
        <Modal.Header>{props.modal.header}</Modal.Header>
        <Icon
          styleName='close-icon'
          color='black'
          size='small'
          name='close'
          onClick={props.closeModal}
        />
        {returnForm(props.modal.form, props.modal.initialValues)}
      </Modal>);
  }
  return null;
};

const returnForm = (type) => {
  switch (type) {
    case OPEN_CREATE_USER_MODAL:
      return <CreateUserForm/>;
    default:
      return null;
  }
};

FormModal.propTypes = {
  modal: PropTypes.object,
  closeModal: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  modal: state.modal.formModal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export const FormModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormModal);
