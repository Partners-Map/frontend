import { createApi } from '@reduxjs/toolkit/query/react';
import { TCategory } from '../../../@types/models/category';
import { baseQuery } from '../../config';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery,
  endpoints: builder => ({
    getCategories: builder.query<TCategory[], void>({
      query: () => '/categories'
    }),
    getCategoryById: builder.query<TCategory, string>({
      query: id => `/category/${id}`
    })
  })
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoryApi;
