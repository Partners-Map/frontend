import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { authApi } from '../services/auth';
import { categoryApi } from '../services/category';
import { discountApi } from '../services/discount';
import { discountTypeApi } from '../services/discount-type';
import { partnerApi } from '../services/partners';
import { placeApi } from '../services/place';

const rootReducer = combineReducers({
  [placeApi.reducerPath]: placeApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [partnerApi.reducerPath]: partnerApi.reducer,
  [discountApi.reducerPath]: discountApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [discountTypeApi.reducerPath]: discountTypeApi.reducer
});

const apiMiddleware = [
  placeApi.middleware,
  authApi.middleware,
  partnerApi.middleware,
  discountApi.middleware,
  categoryApi.middleware,
  discountTypeApi.middleware
];

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiMiddleware)
});

setupListeners(store.dispatch);
