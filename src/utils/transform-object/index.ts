import { TPlaceWithFullInfo, TPlacesWithCategorie } from '../../@types/models/place';
import { EditPlaceState } from '../../__data__/slices/edit-place';

export const transformObject = (
  original: TPlaceWithFullInfo,
  withCategory: TPlacesWithCategorie
): EditPlaceState => {
  return {
    partnerId: original.partner.id,
    categoryId: withCategory.categoryId,
    place: {
      title: original.title,
      description: original.description,
      kitchen: original.kitchen,
      openingTime: original.openingTime,
      closingTime: original.closingTime,
      minAvgPriceId: original.minAvgPriceId,
      maxAvgPriceId: original.maxAvgPriceId
    },
    discount: {
      conditions: original.discount.conditions,
      amount: original.discount.amount,
      information: original.discount.information,
      discountTypeId: original.discount.discountTypeId
    },
    addresses: original.address.map(address => ({
      city: address.city,
      street: address.street,
      house: address.house,
      latitude: address.latitude,
      longitude: address.longitude
    }))
  };
};
