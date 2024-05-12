import { createApi } from '@reduxjs/toolkit/query/react';
import { TPartner } from '../../../@types/models/partner';
import { baseQuery } from '../../../configs/api';
import { CreatePartner } from '../../../components/create-partner';

export const partnerApi = createApi({
  reducerPath: 'partnerApi',
  baseQuery,
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
