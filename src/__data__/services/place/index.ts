import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TPlace, TPlaceWithAddress } from '../../../@types/models/place';

export const placeApi = createApi({
  reducerPath: 'placeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/v1' }),
  endpoints: builder => ({
    getPlaces: builder.query<TPlace[], void>({
      query: () => '/places'
    }),
    getPlacesWithAddress: builder.query<TPlaceWithAddress[], void>({
      query: () => '/places/addresses'
    })
  })
});

export const { useGetPlacesQuery, useGetPlacesWithAddressQuery } = placeApi;
