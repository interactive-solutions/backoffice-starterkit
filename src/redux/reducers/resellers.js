import {
  GET_RESELLERS_PENDING,
  GET_RESELLERS_SUCCESS,
  GET_RESELLERS_ERROR
} from 'redux/constants';

type Action = {
  type: string;
  payload: any;
}

const INITIAL_STATE = {
  resellers: []
};

class ResellerReducer {
  handle = (state = INITIAL_STATE, action: Action) => {
    return Object.assign({}, state, {
      resellers: this.getResellerState(state.resellers, action)
    });
  }

  getResellerState = (state, action: Action) => {
    switch (action.type) {
      case GET_RESELLERS_PENDING:
        return state.resellers;

      case GET_RESELLERS_SUCCESS:
        return action.payload;

      case GET_RESELLERS_ERROR:
        return [];

      default:
        return state;
    }
  }
}

export const resellerReducer = new ResellerReducer();
