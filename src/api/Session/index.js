// @flow
import { request } from '../../api';

/** user log in **/
/** @param {string} credentials.email - User email
    @param {string} credentials.password - User password **/
export const postSignIn = (credentials: Object) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(credentials)
  };

  const path = 'auth/sign-in';

  return request(requestOptions, path);
};

/** user log out **/
export const postSignOut = () => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  };

  const path = 'auth/sign-out';

  return request(requestOptions, path);
};