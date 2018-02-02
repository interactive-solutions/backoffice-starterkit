/**
 * This component is the container that
 * contains all the single Notification components.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Notification } from '../notification/notification';
import './style/notifications.scss';

// ---------------------------------
// Notifications
// ---------------------------------

const Notifications = ({ notifications }) => (
  <div styleName='notifications'>
    {Object.values(notifications).map(n => (
      <Notification notification={n}/>
    ))}
  </div>
);

Notifications.propTypes = {
  notifications: PropTypes.object
};

// ---------------------------------
// NotificationsContainer
// ---------------------------------

const mapStateToProps = (state) => ({
  notifications: state.notification.notifications
});

const NotificationsContainer =
  connect(
    mapStateToProps,
    null,
  )(Notifications);

export { NotificationsContainer as Notifications };
