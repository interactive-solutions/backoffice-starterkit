import {
  RESOLVE_USER_PENDING,
  RESOLVE_USER_SUCCESS,
  RESOLVE_USER_ERROR
} from 'redux/constants';

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
