import { createApi } from '@reduxjs/toolkit/query/react';
import {
  TPlace,
  TPlaceWithAddress,
  TPlaceWithFullInfo,
  TPlacesWithCategorie
} from '../../../@types/models/place';
import { baseQuery } from '../../../configs/api';
import { NewPlaceState } from '../../slices/new-place';

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
    getPlaceByIdWithCategory: builder.query<TPlacesWithCategorie[], string>({
      query: id => `/place/${id}/with-category`
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
    }),
    getPlaceByIdWithFullInfo: builder.query<TPlaceWithFullInfo, string>({
      query: id => `/place/${id}/full-info`
    }),
    createFullPlace: builder.mutation<TPlace, NewPlaceState>({
      query: data => ({
        url: 'place/full',
        method: 'POST',
        body: data
      })
    }),
    updatePlaceWithFullInfo: builder.mutation<TPlace, { id: string; data: NewPlaceState }>({
      query: ({ id, data }) => ({
        url: `place/${id}/full`,
        method: 'PUT',
        body: data
      })
    }),
    deletePlaceById: builder.mutation<TPlace, string>({
      query: id => ({
        url: `/place/${id}`,
        method: 'DELETE'
      })
    })
  })
});

export const {
  useGetPlacesQuery,
  useGetPlacesWithFullInfoQuery,
  useGetPlacesWithCategoriesQuery,
  useGetPlacesWithAddressQuery,
  useGetPlaceByIdQuery,
  useGetPlaceByIdWithAddressQuery,
  useGetPlaceByIdWithFullInfoQuery,
  useCreateFullPlaceMutation,
  useDeletePlaceByIdMutation,
  useGetPlaceByIdWithCategoryQuery,
  useUpdatePlaceWithFullInfoMutation
} = placeApi;
