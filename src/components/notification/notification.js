import React from 'react';
import PropTypes from 'prop-types';
import {
  Message
  // Icon,
  // Grid
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

const Notification = ({ notification, closeNotification }) => {
  if (!notification) {
    /**
     * notification === null means that there is no notification
     * so don't draw it.
     */
    return null;
  }

  const { header, content, id, type } = notification;
  switch (type) {
    case notificationType.INFO:
      return (
        <Message
          info
          styleName='notification'
          icon='info circle'
          header={header}
          content={content}
          onDismiss={() => closeNotification(id)}
        />
      );
    default: // notificationType.SUCCESS
      return (
        <Message
          success
          styleName='notification'
          icon='checkmark box'
          header={header}
          content={content}
          onDismiss={() => closeNotification(id)}
        />
      );
  }
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  closeNotification: PropTypes.func.isRequired
};

// ---------------------------------
// NotificationContainer
// ---------------------------------

// const mapStateToProps = (state) => ({
//   notification: state.notification.notification
// });

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
