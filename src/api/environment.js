
export type ApiEnvironment = {
  apiUri?: string;
  staticUri?: string;
};

let apiEnvironment: ApiEnvironment = {};

switch (document.domain) {
  case 'localhost':
    apiEnvironment.apiUrl = 'http://api.duocircle.se/';
    apiEnvironment.staticUri = 'http://static.duocircle.se/';
    break;

  case 'staging':
    apiEnvironment.apiUrl = 'http://api.duocircle.s2.isdemo.se/';
    apiEnvironment.staticUri = 'http://static.duocircle.s2.isdemo.se/';
    break;

  default:
    apiEnvironment.apiUrl = 'http://api.duocircle.s2.isdemo.se/';
    apiEnvironment.staticUri = 'http://static.duocircle.s2.isdemo.se/';
}

export default apiEnvironment;
