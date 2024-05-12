import { createApi } from '@reduxjs/toolkit/query/react';
import { TDiscount } from '../../../@types/models/discount';
import { baseQuery } from '../../../configs/api';

export const discountApi = createApi({
  reducerPath: 'discountApi',
  baseQuery,

  endpoints: builder => ({
    getDiscounts: builder.query<TDiscount[], void>({
      query: () => '/discounts'
    })
  })
});

export const { useGetDiscountsQuery } = discountApi;
