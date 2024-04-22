import { TAddress } from '../address';

export type TPlace = {
  id: string;
  title: string;
  description: string;
  kitchen: string;
  openingTime: string;
  closingTime: string;
  minAvgPriceId: string;
  maxAvgPriceId: string;
  partnerId: string;
  discountId: string;
};

export type TNewPlace = {
  title: string;
  description: string;
  kitchen: string;
  openingTime: string;
  closingTime: string;
  minAvgPriceId: string;
  maxAvgPriceId: string;
};

export type TPlaceWithAddress = TPlace & {
  address: TAddress[];
};
