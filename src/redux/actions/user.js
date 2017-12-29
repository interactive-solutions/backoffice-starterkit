import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from 'redux/constants';
import { authenticationService } from 'api';

export function login(username: string, password: string) {
  return (dispatch) => {
    return {
      types: {
        LOGIN_PENDING,
        LOGIN_SUCCESS,
        LOGIN_ERROR
      },
      payload: authenticationService.login({ username, password })
        .then(response => response)
    };
  };
}
