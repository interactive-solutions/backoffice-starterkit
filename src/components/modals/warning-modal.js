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
 * A simple Modal that essentially mimics the
 * behaviour of window.alert.
 */
export class WarningModal extends Component {
  render = () => {
    const { icon, header, content, buttonText } = this.props; // eslint-disable-line

    return (
      <Modal open size='tiny' className='modal-body'>
        <Icon className='modal-center' color='red' name={icon} size='massive'/>
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
          {buttonText}
        </Button>
      </Modal>
    );
  }
};

WarningModal.propTypes = {
  icon: PropTypes.string,
  header: PropTypes.string.isRequired,
  content: PropTypes.string,
  buttonText: PropTypes.string,
  closeModal: PropTypes.func.isRequired
};

WarningModal.defaultProps = {
  icon: 'warning circle',
  buttonText: 'Ok'
};
