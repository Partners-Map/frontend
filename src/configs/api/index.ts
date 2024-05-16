import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { redirect } from 'react-router-dom';
import { RoutesList } from '../../routers';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:3002/api/v1',
  credentials: 'include'
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    redirect(RoutesList.LoginPage);
    return result;
  }
  return result;
};

export const persistConfig = {
  key: 'root'
};
