import axios from 'axios';
import { apiUriInterceptor, authorizationHeaderInterceptor } from './utils';

export { authenticationService, authenticationStorage } from './authentication/index';

axios.interceptors.request.use(apiUriInterceptor);
axios.interceptors.request.use(authorizationHeaderInterceptor);
