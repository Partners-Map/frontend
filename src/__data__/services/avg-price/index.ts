import { createApi } from '@reduxjs/toolkit/query/react';
import { TAvgPrice, TAvgPriceRange } from '../../../@types/models/avg-price';
import { baseQueryWithReauth } from '../../../configs/api';

export const avgPriceApi = createApi({
  reducerPath: 'avgPriceApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getAvgPrices: builder.query<TAvgPrice[], void>({
      query: () => '/avg-prices'
    }),
    getAvgPricesRanges: builder.query<TAvgPriceRange[], void>({
      query: () => '/avg-prices/ranges'
    }),
    getAvgPriceById: builder.query<TAvgPrice, string>({
      query: id => `/avg-price/${id}`
    })
  })
});

export const { useGetAvgPricesQuery, useGetAvgPricesRangesQuery, useGetAvgPriceByIdQuery } =
  avgPriceApi;
