// @flow
import { request } from '../../api';

/** get groups list **/
export const getGroupsList = () => {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const path = 'groups';

  return request(requestOptions, path);
};

/** get group by id
 * @param id(string)**/
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
