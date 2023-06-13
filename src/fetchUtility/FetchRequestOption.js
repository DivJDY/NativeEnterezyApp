export const FetchUtilityOptions = method => {
  console.warn(' meth   ', method);
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: method,
  };

  return requestOptions;
};
