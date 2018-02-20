import {
  authenticationService,
  userService
} from 'api';

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

const RESOLVE_USER_PENDING = 'backoffice:resolve-user:pending';
const RESOLVE_USER_SUCCESS = 'backoffice:resolve-user:success';
const RESOLVE_USER_ERROR = 'backoffice:resolve-user:error';

const LOG_OUT = 'backoffice:logout';

const RESOLVE_USERS_PENDING = 'backoffice:resolve-users:pending';
const RESOLVE_USERS_SUCCESS = 'backoffice:resolve-users:success';
const RESOLVE_USERS_ERROR = 'backoffice:resolve-users:error';

// ------------------------------------
// Actions
// ------------------------------------

export function resolveUser() {
  return (dispatch) => dispatch({

    types: [
      RESOLVE_USER_PENDING,
      RESOLVE_USER_SUCCESS,
      RESOLVE_USER_ERROR
    ],
    payload: {
      promise: userService.resolveUser()
        .then(response => response)
    }

  });
}

export function logout() {
  userService.logout();
  authenticationService.clear();
  return {
    type: LOG_OUT
  };
}

export function resolveUsers() {
  return (dispatch) => dispatch({

    types: [
      RESOLVE_USERS_PENDING,
      RESOLVE_USERS_SUCCESS,
      RESOLVE_USERS_ERROR
    ],
    payload: {
      promise: userService.resolveUsers()
        .then(response => response) // todo remove
    }
  });
}

// ------------------------------------
// Reducers
// ------------------------------------

const INITIAL_STATE = {
  user: null,
  users: []
};

class UserReducer {
  handle = (state = INITIAL_STATE, action: Action) => Object.assign({}, state, {
    user: this.getUserState(state.user, action),
    users: this.getUsersState(state.users, action)
  })

  getUserState = (state, action: Action) => {
    switch (action.type) {
      case RESOLVE_USER_PENDING:
        return state;

      case RESOLVE_USER_SUCCESS:
        return action.payload;

      case RESOLVE_USER_ERROR:
        return action.payload;

      case LOG_OUT:
        return null;

      default:
        return state;
    }
  }

  getUsersState = (state, action: Action) => {
    switch (action.type) {
      case RESOLVE_USERS_PENDING:
        return state;

      case RESOLVE_USERS_SUCCESS:
        return action.payload;

      case RESOLVE_USERS_ERROR:
        return [];

      default:
        return state;
    }
  }
}

export const userReducer = new UserReducer();
