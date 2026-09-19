const baseUrl = 'http://localhost:8006/api'

let headers = new Headers();
headers.append('content-type', 'application/json');
headers.append('accept', 'application/json');

export const properties = {
  COMMON_HEADERS: headers,
  AUTH: baseUrl + '/auth/token'

};