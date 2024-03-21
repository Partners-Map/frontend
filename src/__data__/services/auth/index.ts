import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TLoginData } from '../../../@types/api/auth';
import { useAuth } from '../../../hooks/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/v1/auth' }),
  endpoints: builder => ({
    login: builder.mutation<TLoginData, any>({
      query: loginData => ({
        url: '/login',
        method: 'POST',
        body: {
          email: loginData.email,
          password: loginData.password
        }
      }),
      transformResponse: (response: TLoginData): TLoginData => {
        const { initSetup } = useAuth();
        initSetup(response.accessToken);
        return response;
      }
    })
  })
});

export const { useLoginMutation } = authApi;
