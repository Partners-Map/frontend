import { createApi } from '@reduxjs/toolkit/query/react';
import { TLoginData, TLoginParams } from '../../../@types/api/auth';
import { baseQuery } from '../../config';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    login: builder.mutation<TLoginData, TLoginParams>({
      query: loginData => ({
        url: '/login',
        method: 'POST',
        body: {
          email: loginData.email,
          password: loginData.password
        }
      })
    })
  })
});

export const { useLoginMutation } = authApi;
