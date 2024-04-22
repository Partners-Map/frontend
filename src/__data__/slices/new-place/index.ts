import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TNewPlace } from '../../../@types/models/place';
import { TNewDiscount } from '../../../@types/models/discount';
import { TNewAddress } from '../../../@types/models/address';

export type newPlaceState = {
  partnerId: string;
  place: TNewPlace;
  discount: TNewDiscount;
  address: TNewAddress;
};

const initialState: newPlaceState = {
  partnerId: '',
  place: {
    title: '',
    description: '',
    kitchen: '',
    openingTime: '',
    closingTime: '',
    minAvgPriceId: '',
    maxAvgPriceId: ''
  },
  discount: {
    conditions: [],
    amount: 0,
    information: '',
    discountTypeId: ''
  },
  address: {
    city: '',
    street: '',
    house: '',
    latitude: '',
    longitude: ''
  }
};

const newPlaceSlice = createSlice({
  name: 'newPlaceSlice',
  initialState,
  reducers: {
    setPartner: (state, action: PayloadAction<string>) => {
      state.partnerId = action.payload;
    },
    setPlace: (state, action: PayloadAction<TNewPlace>) => {
      state.place = action.payload;
    },
    setDiscount: (state, action: PayloadAction<TNewDiscount>) => {
      state.discount = action.payload;
    },
    setAddress: (state, action: PayloadAction<TNewAddress>) => {
      state.address = action.payload;
    },
    clearNewPlace: () => {
      return { ...initialState };
    }
  }
});

export const { setPartner, setPlace, setDiscount, setAddress, clearNewPlace } = newPlaceSlice.actions;
export const newPlaceReducer = newPlaceSlice.reducer;
