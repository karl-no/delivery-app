import axios from 'axios';

export const BAD_REQUEST = 400;

export const createSale = (payload, jwt) => axios
  .post(
    'http://localhost:3001/sales/create',
    {
      ...payload,
    },
    {
      headers: {
        'content-type': 'application/json',
        authorization: jwt,
      },
    },
  )
  .then((data) => data)
  .catch((error) => {
    switch (error.response.status) {
    case BAD_REQUEST:
      return 'Some fields are invalid';
    default:
      return 'internal server error';
    }
  });
