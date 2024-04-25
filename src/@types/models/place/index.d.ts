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

export type TPlacesWithCategorie = {
  placeId: string;
  categoryId: string;
  assignedAt: string;
  place: {
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
  category: {
    id: string;
    title: string;
  };
};

export type TPlaceWithFullInfo = {
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
  minAvgPrice: {
    id: string;
    symbol: string;
    slug: string;
  };
  maxAvgPrice: {
    id: string;
    symbol: string;
    slug: string;
  };
  partner: {
    id: string;
    name: string;
  };
  address: [
    {
      id: string;
      city: string;
      street: string;
      house: string;
      latitude: string;
      longitude: string;
      placeId: string;
    }
  ];
  discount: {
    id: string;
    conditions: string[];
    amount: number;
    information: string;
    discountTypeId: string;
  };
  _count?: {
    address: number;
    placeToCategory: number;
  };
};
