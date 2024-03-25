import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TCategory } from '../../../@types/models/category';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/v1' }),
  endpoints: builder => ({
    getCategories: builder.query<TCategory[], void>({
      query: () => '/categories'
    })
  })
});

export const { useGetCategoriesQuery } = categoryApi;
