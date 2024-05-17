import { createApi } from '@reduxjs/toolkit/query/react';
import type { TPartner } from '../../../@types/models/partner';
import { baseQueryWithReauth } from '../../../configs/api';

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    getPartners: builder.query<TPartner[], void>({
      query: () => '/partners'
    }),
    createPartner: builder.mutation<TPartner, Omit<TPartner, 'id'>>({
      query: data => ({
        url: 'partner',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { useGetPartnersQuery, useCreatePartnerMutation } = partnerApi;
