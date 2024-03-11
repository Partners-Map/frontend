import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const placeApi = createApi({
  reducerPath: 'placeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3002/api/v1' }),
  endpoints: builder => ({
    getPlaces: builder.query<any, void>({
      query: () => '/places'
    })
  })
});

export const { useGetPlacesQuery } = placeApi;
