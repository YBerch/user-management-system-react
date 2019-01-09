// @flow
import { request } from '../../api';

/** get search results **/
export const search = (data: string) => {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
  };

  const path = `search?general=${data}`;

  return request(requestOptions, path);
};
