import { createApi } from '@reduxjs/toolkit/query/react';
import { TDiscount } from '../../../@types/models/discount';
import { baseQueryWithReauth } from '../../../configs/api';

export const discountApi = createApi({
  reducerPath: 'discountApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getDiscounts: builder.query<TDiscount[], void>({
      query: () => '/discounts'
    })
  })
});

export const { useGetDiscountsQuery } = discountApi;
