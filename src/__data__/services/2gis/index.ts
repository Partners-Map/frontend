import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gisApi = createApi({
  reducerPath: 'gisApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://catalog.api.2gis.com/3.0'
  }),
  endpoints: builder => ({
    geocoder: builder.mutation<any, string>({
      query: address => ({
        url: `/items/geocode?q=${address}&fields=items.point&key=${String(import.meta.env.VITE_API_KEY)}`,
        method: 'GET'
      })
    })
  })
});

export const { useGeocoderMutation } = gisApi;
