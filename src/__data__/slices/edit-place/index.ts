import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TNewPlace } from '../../../@types/models/place';
import { TNewDiscount } from '../../../@types/models/discount';
import { TNewAddress } from '../../../@types/models/address';

export type EditPlaceState = {
  partnerId: string;
  categoryId: string;
  place: TNewPlace;
  discount: TNewDiscount;
  addresses: TNewAddress[];
};

const initialState: EditPlaceState = {
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

const editPlaceSlice = createSlice({
  name: 'editPlaceSlice',
  initialState,
  reducers: {
    initEditData: (state, action: PayloadAction<EditPlaceState>) => {
      state.partnerId = action.payload.partnerId;
      state.categoryId = action.payload.categoryId;
      state.place = action.payload.place;
      state.discount = action.payload.discount;
      state.addresses = action.payload.addresses;
    },
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
    clearEditPlace: () => {
      return { ...initialState };
    }
  }
});

export const {
  initEditData,
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
  clearEditPlace
} = editPlaceSlice.actions;
export const editPlaceReducer = editPlaceSlice.reducer;
