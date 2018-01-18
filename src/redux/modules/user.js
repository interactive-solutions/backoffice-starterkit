import { userService } from 'api';

// ------------------------------------
// Constants
// ------------------------------------

const RESOLVE_USER_PENDING = 'backoffice:resolve-user:pending';
const RESOLVE_USER_SUCCESS = 'backoffice:resolve-user:success';
const RESOLVE_USER_ERROR = 'backoffice:resolve-user:error';

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

// ------------------------------------
// Reducers
// ------------------------------------

type Action = {
  type: string;
  payload: any;
}

const INITIAL_STATE = {
  user: null
};

class UserReducer {
  handle = (state = INITIAL_STATE, action: Action) => {
    return Object.assign({}, state, {
      user: this.getUserState(state.user, action)
    });
  }

  getUserState = (state, action: Action) => {
    switch (action.type) {
      case RESOLVE_USER_PENDING:
        return state;

      case RESOLVE_USER_SUCCESS:
        return action.payload;

      case RESOLVE_USER_ERROR:
        return action.payload;
      default:
        return state;
    }
  }
}

export const userReducer = new UserReducer();
