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

const RESOLVE_USER_PENDING = 'backoffice:get-user:pending';
const RESOLVE_USER_SUCCESS = 'backoffice:get-user:success';
const RESOLVE_USER_ERROR = 'backoffice:get-user:error';

const CREATE_USER_PENDING = 'backoffice:create-user:pending';
const CREATE_USER_SUCCESS = 'backoffice:create-user:success';
const CREATE_USER_ERROR = 'backoffice:create-user:error';

const LOG_OUT = 'backoffice:logout';

const GET_USERS_PENDING = 'backoffice:get-users:pending';
const GET_USERS_SUCCESS = 'backoffice:get-users:success';
const GET_USERS_ERROR = 'backoffice:get-users:error';

const SEARCH_USERS_PENDING = 'backoffice:search-users:pending';
const SEARCH_USERS_SUCCESS = 'backoffice:search-users:success';
const SEARCH_USERS_ERROR = 'backoffice:search-users:error';

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

export function getUsers() {
  return (dispatch) => dispatch({

    types: [
      GET_USERS_PENDING,
      GET_USERS_SUCCESS,
      GET_USERS_ERROR
    ],
    payload: {
      promise: userService.getUsers()
    }
  });
}

export function createUser(username, roles) {
  return (dispatch) => dispatch({

    types: [
      CREATE_USER_PENDING,
      CREATE_USER_SUCCESS,
      CREATE_USER_ERROR
    ],
    payload: {
      promise: userService.create(username, roles)
    }
  });
}

export function searchUsers(username) {
  return (dispatch) => dispatch({

    types: [
      SEARCH_USERS_PENDING,
      SEARCH_USERS_SUCCESS,
      SEARCH_USERS_ERROR
    ],
    payload: {
      promise: userService.search(username)
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
        return null;

      case LOG_OUT:
        return null;

      default:
        return state;
    }
  }

  getUsersState = (state, action: Action) => {
    switch (action.type) {
      case GET_USERS_PENDING:
      case SEARCH_USERS_PENDING:
      case CREATE_USER_PENDING:
        return state;

      case GET_USERS_SUCCESS:
      case SEARCH_USERS_SUCCESS:
      case CREATE_USER_SUCCESS:
        return action.payload;

      case GET_USERS_ERROR:
      case SEARCH_USERS_ERROR:
      case CREATE_USER_ERROR:
        return [];

      default:
        return state;
    }
  }
}

export const userReducer = new UserReducer();
