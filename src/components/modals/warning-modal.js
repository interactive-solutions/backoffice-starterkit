import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'semantic-ui-react';

/**
 * This wrapper draws the modal if
 * redux state says that a Modal should be drawn
 * otherwise it draws nothing.
 */
export const WarningModalWrapper = (props) => {
  if (props.modal !== null && props.modal !== undefined) {
    return <WarningModal {...props.modal} closeModal={props.closeModal}/>;
  }
  return null;
};

WarningModalWrapper.propTypes = {
  modal: PropTypes.object,
  closeModal: PropTypes.func.isRequired
};

/**
 * A simple warning modal that essentially mimics the
 * behaviour of window.alert.
 */
export class WarningModal extends Component {
  render = () => {
    const {
      header,
      content
    } = this.props;

    return (
      <Modal open size='tiny' className='modal-body'>
        <Icon color='red' name='warning circle' size='massive'/>
        <h2>{header}</h2>
        <div className='modal-content-text'>{content}</div>
        <Button
          color='red'
          inverted
          onClick={this.props.closeModal}
          size='big'
        >
          Ok
        </Button>
      </Modal>
    );
  }
};

WarningModal.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string,
  closeModal: PropTypes.func.isRequired
};
