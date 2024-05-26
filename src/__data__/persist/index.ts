import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { newPlaceReducer } from '../slices/new-place';
import { editPlaceReducer } from '../slices/edit-place';

export const newPlacePersistConfig = {
  key: 'newPlaceReducer',
  storage
};

export const editPersistConfig = {
  key: 'editPlaceReducer',
  storage
};

export const persistedNewPlaceReducer = persistReducer(newPlacePersistConfig, newPlaceReducer);
export const persistedEditPlaceReducer = persistReducer(editPersistConfig, editPlaceReducer);

