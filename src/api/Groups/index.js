// @flow
import { request } from '../../api';

/** get groups list
 * @param data(object) - request parameters**/
export const getGroupsList = (data: Object) => {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  let path = `groups?page=${data.page}&size=${data.size}`;

  if(data.groups && data.groups instanceof Array && data.groups.length){
    path += `&groups=${JSON.stringify(data.groups)}`
  }

  return request(requestOptions, path);
};

/** get group by id
 * @param id(string) - group id**/
export const getGroup = (id: string) => {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const path = `groups/${id}`;

  return request(requestOptions, path);
};

/** create user
 * @param data(object) - group credentials object **/
export const postCreateGroup = (data: Object) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(data)
  };

  const path = 'groups/create';

  return request(requestOptions, path);
};
