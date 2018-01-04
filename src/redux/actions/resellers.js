import {
  GET_RESELLERS_PENDING,
  GET_RESELLERS_SUCCESS,
  GET_RESELLERS_ERROR
} from 'redux/constants';
import { resellerService } from 'api';

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
