
export type ApiEnvironment = {
  apiUri?: string;
  staticUri?: string;
};

const apiEnvironment: ApiEnvironment = {};

switch (document.domain) {
  case 'localhost':
    apiEnvironment.apiUrl = 'http://localhost:3000/';
    apiEnvironment.staticUri = 'http://localhost:3000/';
    break;

  case 'staging':
    apiEnvironment.apiUrl = 'http://localhost:3000/';
    apiEnvironment.staticUri = 'http://localhost:3000/';
    break;

  default:
    apiEnvironment.apiUrl = 'http://localhost:3000/';
    apiEnvironment.staticUri = 'http://localhost:3000/';
}

export default apiEnvironment;
