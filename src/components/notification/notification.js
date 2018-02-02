import React from 'react';
import PropTypes from 'prop-types';
import {
  Message,
  Transition
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeNotification as closeNotificationAction } from 'redux/modules/notification';
import './style/notification.scss';

// ---------------------------------
// Constants
// ---------------------------------

export const notificationType = {
  INFO: 'info',
  SUCCESS: 'success'
};

// ---------------------------------
// Notification
// ---------------------------------

class Notification extends React.Component {
  state = {
    visible: false
  }

  componentDidMount() {
    /**
     * Triggers transition animation.
     * I can't get it to trigger the animation without
     * this 'setState'. The element will be rendered twice
     * once with visibility=false then visibility=true
     * that transition will trigger the animation.
     */
    this.setState({ visible: true }); // eslint-disable-line
  }

  onDismiss = () => {
    this.setState({ visible: false }); // triggers transiton animation.
  }

  onTransitionComplete = () => {
    /**
     * Wait until the removal animation is done,
     * then remove the notification from redux
     */
    if (!this.state.visible) {
      this.props.closeNotification(this.props.notification.id);
    }
  }

  render = () => {
    const { notification } = this.props;
    const { header, content, type } = notification;
    let message;

    switch (type) {
      case notificationType.INFO:
        message = (
          <Message
            info
            styleName='notification'
            icon='info circle'
            header={header}
            content={content}
            onDismiss={this.onDismiss}
          />
        );
        break;
      default: // notificationType.SUCCESS
        message = (
          <Message
            success
            styleName='notification'
            icon='checkmark box'
            header={header}
            content={content}
            onDismiss={this.onDismiss}
          />
        );
    }

    /**
     * The div below is needed:
     * https://github.com/Semantic-Org/Semantic-UI-React/issues/2166#issuecomment-334478073
     */
    return (
      <Transition visible={this.state.visible} animation='fade up' duration={600} onComplete={this.onTransitionComplete}>
        <div styleName='extra-padding'>
          {message}
        </div>
      </Transition>
    );
  }
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  closeNotification: PropTypes.func.isRequired
};

// ---------------------------------
// NotificationContainer
// ---------------------------------

const mapDispatchToProps = dispatch => ({
  closeNotification: id => dispatch(closeNotificationAction(id))
});

const NotificationContainer =
  connect(
    null,
    mapDispatchToProps,
  )(Notification);

NotificationContainer.propTypes = {
  notification: PropTypes.object.isRequired
};

export { NotificationContainer as Notification };
