import { createApi } from '@reduxjs/toolkit/query/react';
import { TPlace, TPlaceWithAddress } from '../../../@types/models/place';
import { baseQuery } from '../../config';

export const placeApi = createApi({
  reducerPath: 'placeApi',
  baseQuery,
  endpoints: builder => ({
    getPlaces: builder.query<TPlace[], void>({
      query: () => '/places'
    }),
    getPlacesWithAddress: builder.query<TPlaceWithAddress[], void>({
      query: () => '/places/addresses'
    }),
    getPlaceById: builder.query<TPlace, string>({
      query: id => `/place/${id}`
    }),
    getPlaceByIdWithAddress: builder.query<TPlaceWithAddress, string>({
      query: id => `/place/${id}/address`
    })
  })
});

export const {
  useGetPlacesQuery,
  useGetPlacesWithAddressQuery,
  useGetPlaceByIdQuery,
  useGetPlaceByIdWithAddressQuery
} = placeApi;
