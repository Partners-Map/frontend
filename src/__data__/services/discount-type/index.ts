import { createApi } from '@reduxjs/toolkit/query/react';
import type { TDiscountType } from '../../../@types/models/discount-type';
import { baseQuery } from '../../../configs/api';

export const discountTypeApi = createApi({
  reducerPath: 'discountTypeApi',
  baseQuery,
  endpoints: builder => ({
    getDiscountTypes: builder.query<TDiscountType[], void>({
      query: () => '/discount-types'
    })
  })
});

export const { useGetDiscountTypesQuery } = discountTypeApi;
