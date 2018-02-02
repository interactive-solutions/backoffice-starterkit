import uniqueId from 'lodash.uniqueid';

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

export const openNotification = ({ header, content, type }) => ({
  type: OPEN_NOTIFICATION,
  payload: {
    type,
    header,
    content
  }
});

export const closeNotification = (id) => ({
  type: CLOSE_NOTIFICATION,
  payload: {
    id
  }
});

// ------------------------------------
// Reducers
// ------------------------------------

const INITIAL_STATE = {
  /**
   * An object of notifications.
   * An empty object means that there
   * are currently no notifications.
   */
  notifications: {}
};

class NotificationReducer {
  handle = (state = INITIAL_STATE, action: Action) => {
    return Object.assign({}, state, {
      notifications: this.handleNotification(state.notifications, action)
    });
  }

  handleNotification = (state, action: Action) => {
    switch (action.type) {
      case OPEN_NOTIFICATION: {
        const id = uniqueId();
        return {
          ...state, // all previous notifications

          [id]: { // the new notification
            ...action.payload,
            id
          }
        };
      }

      case CLOSE_NOTIFICATION: {
        const { [action.payload.id]: objectToRemove, ...rest } = state;
        return rest;
      }

      default:
        return state;
    }
  }
}

export const notificationReducer = new NotificationReducer();
