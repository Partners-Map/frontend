import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TDiscount } from '../../../@types/models/discount';

export const discountApi = createApi({
  reducerPath: 'discountApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/v1' }),
  endpoints: builder => ({
    getDiscounts: builder.query<TDiscount[], void>({
      query: () => '/discounts'
    })
  })
});

export const { useGetDiscountsQuery } = discountApi;
