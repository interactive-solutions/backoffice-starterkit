import { authenticationStorage } from 'api/authentication/index';

export function onLocationChange() {
  window.scrollTo(0, 0);
}

export function requiresAuthentication(nextState, replace) {
  if (!authenticationStorage.read()) {
    replace(`/login`);
  }
}
