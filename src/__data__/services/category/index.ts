import { createApi } from '@reduxjs/toolkit/query/react';
import { TCategory } from '../../../@types/models/category';
import { baseQuery } from '../../../configs/api';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery,
  endpoints: builder => ({
    getCategories: builder.query<TCategory[], void>({
      query: () => '/categories'
    }),
    getCategoryById: builder.query<TCategory, string>({
      query: id => `/category/${id}`
    }),
    deleteCategoryById: builder.mutation<void, string>({
      query: id => ({
        url: `/category/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const { useGetCategoriesQuery, useGetCategoryByIdQuery, useDeleteCategoryByIdMutation } =
  categoryApi;
