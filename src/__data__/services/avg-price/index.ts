import { createApi } from '@reduxjs/toolkit/query/react';
import { TAvgPrice } from '../../../@types/models/avg-price';
import { baseQuery } from '../../config';

export const avgPriceApi = createApi({
  reducerPath: 'avgPriceApi',
  baseQuery,
  endpoints: builder => ({
    getAvgPrices: builder.query<TAvgPrice[], void>({
      query: () => '/avg-prices'
    })
  })
});

export const { useGetAvgPricesQuery } = avgPriceApi;
