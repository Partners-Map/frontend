import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3002/api/v1/auth',
  credentials: 'include'
});
