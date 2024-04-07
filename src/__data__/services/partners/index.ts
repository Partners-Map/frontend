import { createApi } from '@reduxjs/toolkit/query/react';
import { TPartner } from '../../../@types/models/partner';
import { baseQuery } from '../../config';

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery,
  endpoints: builder => ({
    getPartners: builder.query<TPartner[], void>({
      query: () => '/partners'
    })
  })
});

export const { useGetPartnersQuery } = partnerApi;
