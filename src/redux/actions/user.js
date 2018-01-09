import {
  RESOLVE_USER_PENDING,
  RESOLVE_USER_SUCCESS,
  RESOLVE_USER_ERROR,
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR
} from 'redux/constants';
import { userService } from 'api';

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

export function resetPassword() {
  return (dispatch) => dispatch({

    types: [
      RESET_PASSWORD_PENDING,
      RESET_PASSWORD_SUCCESS,
      RESET_PASSWORD_ERROR
    ],
    payload: {
      promise: userService.resetPassword()
        .then(response => response)
    }

  });
}
