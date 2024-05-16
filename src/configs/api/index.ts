import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:3002/api/v1',
  credentials: 'include'
});

export const persistConfig = {
  key: 'root'
};
