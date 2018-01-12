import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

/**
 * This wrapper draws the Modal if
 * redux state says that a Modal should be drawn
 * otherwise it draws nothing.
 */
export const AlertModalWrapper = (props) => {
  if (props.modal !== null && props.modal !== undefined) {
    return <AlertModal {...props.modal} closeModal={props.closeModal}/>;
  }
  return null;
};

AlertModalWrapper.propTypes = {
  modal: PropTypes.object,
  closeModal: PropTypes.func.isRequired
};

/**
 * A simple Modal that essentially mimics the
 * behaviour of window.alert.
 */
export class AlertModal extends Component {
  render = () => {
    const { icon, header, content, buttonText } = this.props; // eslint-disable-line

    return (
      <Modal open size='tiny' className='modal-body'>
        <Icon className='modal-center' color='black' name={icon} size='massive'/>
        <Modal.Content className='modal-content'>
          <Header as='h2' textAlign='center'>{content}</Header>
        </Modal.Content>
        <Button
          color='green'
          onClick={this.props.closeModal}
          className='modal-center'
          size='big'
        >
          {buttonText}
        </Button>
      </Modal>
    );
  }
};

AlertModal.propTypes = {
  icon: PropTypes.string,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  closeModal: PropTypes.func.isRequired
};

AlertModal.defaultProps = {
  icon: 'warning circle',
  buttonText: 'Ok'
};
