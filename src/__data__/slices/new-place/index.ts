import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TNewPlace } from '../../../@types/models/place';
import { TNewDiscount } from '../../../@types/models/discount';
import { TNewAddress } from '../../../@types/models/address';

export type NewPlaceState = {
  partnerId: string;
  categoryId: string;
  place: TNewPlace;
  discount: TNewDiscount;
  addresses: TNewAddress[];
};

const initialState: NewPlaceState = {
  partnerId: '',
  categoryId: '',
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
  addresses: []
};

const newPlaceSlice = createSlice({
  name: 'newPlaceSlice',
  initialState,
  reducers: {
    setPartner: (state, action: PayloadAction<string>) => {
      state.partnerId = action.payload;
    },
    setPlaceTitle: (state, action: PayloadAction<string>) => {
      state.place.title = action.payload;
    },
    setPlaceCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    setPlaceDescription: (state, action: PayloadAction<string>) => {
      state.place.description = action.payload;
    },
    setPlaceOpeningTime: (state, action: PayloadAction<string>) => {
      state.place.openingTime = action.payload;
    },
    setPlaceClosingTime: (state, action: PayloadAction<string>) => {
      state.place.closingTime = action.payload;
    },
    setPlaceMinAvgPriceId: (state, action: PayloadAction<string>) => {
      state.place.minAvgPriceId = action.payload;
    },
    setPlaceMaxAvgPriceId: (state, action: PayloadAction<string>) => {
      state.place.maxAvgPriceId = action.payload;
    },
    setDiscount: (state, action: PayloadAction<TNewDiscount>) => {
      state.discount = action.payload;
    },
    setDiscountAmount: (state, action: PayloadAction<number>) => {
      state.discount.amount = action.payload;
    },
    setDiscountInformation: (state, action: PayloadAction<string>) => {
      state.discount.information = action.payload;
    },
    setDiscountDiscountTypeId: (state, action: PayloadAction<string>) => {
      state.discount.discountTypeId = action.payload;
    },
    setDiscountConditions: (state, action: PayloadAction<string[]>) => {
      state.discount.conditions = action.payload;
    },
    setAddress: (state, action: PayloadAction<TNewAddress[]>) => {
      state.addresses = action.payload;
    },
    clearNewPlace: () => {
      return { ...initialState };
    }
  }
});

export const {
  setPartner,
  setPlaceTitle,
  setPlaceCategoryId,
  setPlaceDescription,
  setPlaceOpeningTime,
  setPlaceClosingTime,
  setPlaceMinAvgPriceId,
  setPlaceMaxAvgPriceId,
  setDiscount,
  setDiscountAmount,
  setDiscountInformation,
  setDiscountDiscountTypeId,
  setDiscountConditions,
  setAddress,
  clearNewPlace
} = newPlaceSlice.actions;
export const newPlaceReducer = newPlaceSlice.reducer;
