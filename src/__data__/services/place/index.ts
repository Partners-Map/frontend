import { createApi } from '@reduxjs/toolkit/query/react';
import {
  TPlace,
  TPlaceWithAddress,
  TPlaceWithFullInfo,
  TPlacesWithCategorie
} from '../../../@types/models/place';
import { baseQuery } from '../../config';

export const placeApi = createApi({
  reducerPath: 'placeApi',
  baseQuery,
  endpoints: builder => ({
    getPlaces: builder.query<TPlace[], void>({
      query: () => '/places'
    }),
    getPlacesWithCategories: builder.query<TPlacesWithCategorie[], void>({
      query: () => '/places/with-category'
    }),
    getPlacesWithFullInfo: builder.query<TPlaceWithFullInfo[], void>({
      query: () => '/places/full-info'
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
  useGetPlacesWithFullInfoQuery,
  useGetPlacesWithCategoriesQuery,
  useGetPlacesWithAddressQuery,
  useGetPlaceByIdQuery,
  useGetPlaceByIdWithAddressQuery
} = placeApi;
