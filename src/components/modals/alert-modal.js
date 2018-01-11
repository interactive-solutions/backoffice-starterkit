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
    const { icon, header, content, buttonText } = this.props;

    return (
      <Modal open size='tiny'>
        <Header icon={icon} content={header}/>
        <Modal.Content>
          <p>{content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='green'
            inverted
            onClick={this.props.closeModal}
          >
            <Icon name='checkmark'/> {buttonText}
          </Button>
        </Modal.Actions>
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
  icon: 'info circle',
  buttonText: 'Ok'
};
