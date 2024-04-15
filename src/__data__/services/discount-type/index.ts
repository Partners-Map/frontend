import { createApi } from '@reduxjs/toolkit/query/react';
import type { TDiscountType } from '../../../@types/models/discount-type';
import { baseQuery } from '../../config';

export const discountTypeApi = createApi({
  reducerPath: 'discountTypeApi',
  baseQuery,
  endpoints: builder => ({
    getDiscountTypes: builder.query<TDiscountType[], void>({
      query: () => '/discounttypes'
    })
  })
});

export const { useGetDiscountTypesQuery } = discountTypeApi;
