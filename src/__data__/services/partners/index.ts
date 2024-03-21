import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TPartner } from '../../../@types/models/partner';

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/v1' }),
  endpoints: builder => ({
    getPartners: builder.query<TPartner[], void>({
      query: () => '/partners'
    })
  })
});

export const { useGetPartnersQuery } = partnerApi;
