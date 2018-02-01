import React from 'react';
import PropTypes from 'prop-types';
import {
  Message
  // Icon,
  // Grid
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeNotification as closeModalAction } from 'redux/modules/notification';
import './style/notification.scss';

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

  const { header, content, icon } = notification;
  return (
    <Message
      color='blue'
      styleName='notification'
      icon={icon}
      header={header}
      content={content}
      onDismiss={closeNotification}
    />
  );
};

Notification.propTypes = {
  notification: PropTypes.object,
  closeNotification: PropTypes.func.isRequired
};

// ---------------------------------
// NotificationContainer
// ---------------------------------

const mapStateToProps = (state) => ({
  notification: state.notification.notification
});

const mapDispatchToProps = dispatch => ({
  closeNotification: () => dispatch(closeModalAction())
});

const NotificationContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Notification);

export { NotificationContainer as Notification };
