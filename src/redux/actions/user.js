import {
  RESOLVE_USER_PENDING,
  RESOLVE_USER_SUCCESS,
  RESOLVE_USER_ERROR
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
