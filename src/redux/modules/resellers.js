import { resellerService } from 'api';

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

const GET_RESELLERS_PENDING = 'backoffice:get-resellers:pending';
const GET_RESELLERS_SUCCESS = 'backoffice:get-resellers:success';
const GET_RESELLERS_ERROR = 'backoffice:get-resellers:error';

export const CREATE_RESELLERS_SUCCESS = 'backoffice:create-resellers:success';

// ------------------------------------
// Actions
// ------------------------------------

export function getResellers() {
  return dispatch => dispatch({

    types: [
      GET_RESELLERS_PENDING,
      GET_RESELLERS_SUCCESS,
      GET_RESELLERS_ERROR
    ],
    payload: {
      promise: resellerService.get()
        .then(response => response)
    }

  });
}

// ------------------------------------
// Reducers
// ------------------------------------

const INITIAL_STATE = {
  resellers: []
};

class ResellerReducer {
  handle = (state = INITIAL_STATE, action: Action) => Object.assign({}, state, {
    resellers: this.getResellerState(state.resellers, action)
  })

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
