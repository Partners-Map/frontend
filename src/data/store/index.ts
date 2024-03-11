import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { placeApi } from '../services/place';

const rootReducer = combineReducers({
  [placeApi.reducerPath]: placeApi.reducer
});

const apiMiddleware = [placeApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiMiddleware)
});

setupListeners(store.dispatch);
