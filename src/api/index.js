export const apiUrl = 'http://localhost:8000';

export const request = (requestOptions, path) => {
  return fetch(`${apiUrl}/${path}`, requestOptions)
    .then(response => response.json().then(data => (
        {data, status: response.status}
      ))
    )
    .catch(error => error)
};