import { createApi } from '@reduxjs/toolkit/query/react';
import { TCategory } from '../../../@types/models/category';
import { baseQueryWithReauth } from '../../../configs/api';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getCategories: builder.query<TCategory[], void>({
      query: () => '/categories'
    }),
    getCategoryById: builder.query<TCategory, string>({
      query: id => `/category/${id}`
    }),
    createCategory: builder.mutation<TCategory, Omit<TCategory, 'id'>>({
      query: body => ({
        url: '/category',
        method: 'POST',
        body
      })
    }),
    editCategoryById: builder.mutation<TCategory, TCategory>({
      query: ({ id, title }) => ({
        url: `/category/${id}`,
        method: 'PUT',
        body: {
          id,
          title
        }
      })
    }),
    deleteCategoryById: builder.mutation<void, string>({
      query: id => ({
        url: `/category/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useEditCategoryByIdMutation,
  useDeleteCategoryByIdMutation
} = categoryApi;
