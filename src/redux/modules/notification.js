// ------------------------------------
// Type definitions
// ------------------------------------

type Action = {
  type: string;
  payload: any;
}

// ------------------------------------
// Constants
// ------------------------------------

const OPEN_NOTIFICATION = 'backoffice:notification:open';
const CLOSE_NOTIFICATION = 'backoffice:notification:close';

// ------------------------------------
// Actions
// ------------------------------------

/**
 * @param header
 * @param content
 * @param icon
 */
export const openNotification = ({ header, content, icon }) => ({
  type: OPEN_NOTIFICATION,
  payload: {
    icon,
    header,
    content
  }
});

export const closeNotification = () => ({
  type: CLOSE_NOTIFICATION
});

// ------------------------------------
// Reducers
// ------------------------------------

const INITIAL_STATE = {
  /**
   * null indicates there is no notification
   * that is that the notification is closed.
   */
  notification: { icon: 'log out', content: 'content', header: 'header' }
};

class NotificationReducer {
  handle = (state = INITIAL_STATE, action: Action) => {
    return Object.assign({}, state, {
      notification: this.handleNotification(state.notification, action)
    });
  }

  handleNotification = (state, action: Action) => {
    switch (action.type) {
      case OPEN_NOTIFICATION:
        return action.payload;

      case CLOSE_NOTIFICATION:
        return null;

      default:
        return state;
    }
  }
}

export const notificationReducer = new NotificationReducer();
