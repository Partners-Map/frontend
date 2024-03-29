import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from '../services/auth';
import { placeApi } from '../services/place';

const rootReducer = combineReducers({
  [placeApi.reducerPath]: placeApi.reducer,
  [authApi.reducerPath]: authApi.reducer
});

const apiMiddleware = [placeApi.middleware, authApi.middleware];

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiMiddleware)
});

setupListeners(store.dispatch);
