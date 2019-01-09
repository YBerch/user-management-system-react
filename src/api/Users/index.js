// @flow
import { request } from '../../api';

/** get users list **/
export const getUsersList = (data: Object) => {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const path = `users?page=${data.page}&size=${data.size}`;

  return request(requestOptions, path);
};

/** get user by id
 * @param id(string)**/
export const getUser = (id: string) => {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const path = `users/${id}`;

  return request(requestOptions, path);
};

/** create user
 * @param data(object) - user credentials object **/
export const postCreateUser = (data: Object) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(data)
  };

  const path = 'users/create';

  return request(requestOptions, path);
};