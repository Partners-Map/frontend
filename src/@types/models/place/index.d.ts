import { TAddress } from '../address';

export type TPlace = {
  id: string;
  title: string;
  description: string;
  avgReceipt: number;
  kitchen: string;
  partnerId: string;
  discountId: string;
};

export type TPlaceWithAddress = TPlace & {
  address: TAddress[];
};
