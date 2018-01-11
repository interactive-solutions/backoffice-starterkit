import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

/**
 * A simple Modal that essentially mimics the
 * behaviour of window.alert.
 */
export class AlertModal extends Component {
  state = {
    open: true
  }

  onClose = () =>
    this.setState({ open: false })

  render = () => {
    const { icon, header, content, buttonText } = this.props;

    return (
      <Modal open={this.state.open} size='small'>
        <Header icon={icon} content={header}/>
        <Modal.Content>
          <p>{content}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color='green'
            inverted
            onClick={this.onClose}
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
  content: PropTypes.object.isRequired,
  buttonText: PropTypes.string
};

AlertModal.defaultProps = {
  icon: 'info circle',
  buttonText: 'Ok'
};
