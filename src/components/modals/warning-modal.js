import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

/**
 * This wrapper draws the Modal if
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
    const { header, content } = this.props;

    return (
      <Modal open size='tiny' className='modal-body'>
        <Icon className='modal-center' color='red' name='warning circle' size='massive'/>
        <Modal.Content className='modal-content'>
          <Header
            as='h2'
            textAlign='center'
            className='modal-content'
          >
            {header}
          </Header>
          {
            content && content.length > 0
              ? <div className='modal-content-text'>{content}</div>
              : null
          }
        </Modal.Content>
        <Button
          color='red'
          inverted
          onClick={this.props.closeModal}
          className='modal-center'
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
