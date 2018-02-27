import axios from 'axios';
import { apiUriInterceptor, authorizationHeaderInterceptor } from './utils';

export { authenticationService, authenticationStorage } from './authentication/index';
export { userService, UserEntity } from './user';

axios.interceptors.request.use(apiUriInterceptor);
axios.interceptors.request.use(authorizationHeaderInterceptor);
