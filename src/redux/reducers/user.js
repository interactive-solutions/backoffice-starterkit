import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from 'redux/constants';

type Action = {
  type: string;
  payload: any;
}

const INITIAL_STATE = {
  user: null
};

class UserReducer {
  handle(state = INITIAL_STATE, action: Action) {
    return Object.assign({}, state, {
      user: this.getUserState(state.user, action)
    });
  }

  getUserState(state, action: Action) {
    switch (action.type) {
      case LOGIN_PENDING:
        return {
          user: state.user,
          error: null
        };

      case LOGIN_SUCCESS:
        return {
          user: action.payload,
          error: null
        };

      case LOGIN_ERROR:
        return {
          user: null,
          error: action.payload
        };

      default:
        return state;
    }
  }
}

export const userReducer = new UserReducer();
