import { FunctionComponent } from 'react';
import { TPlaceWithAddress } from '../../@types/models/place';
import {
  PlaceCardAddressS,
  PlaceCardContainerS,
  PlaceCardDescriptionS,
  PlaceCardOtherInfoContainerS,
  PlaceCardOtherInfoTextS,
  PlaceCardTitleS
} from '../../styles/place-card';

type PlacesCardProps = {
  data: TPlaceWithAddress;
};

export const PlaceCard: FunctionComponent<PlacesCardProps> = ({ data }): JSX.Element => {
  const firstAddress = data.address[0];

  return (
    <PlaceCardContainerS>
      <PlaceCardTitleS>{data.title}</PlaceCardTitleS>
      <PlaceCardAddressS>{`${firstAddress?.city}, ${firstAddress?.street}, ${firstAddress?.house}`}</PlaceCardAddressS>
      <PlaceCardDescriptionS>{data.description}</PlaceCardDescriptionS>
      <PlaceCardOtherInfoContainerS>
        <PlaceCardOtherInfoTextS>{'Время работы: 09:00 - 23:00'}</PlaceCardOtherInfoTextS>
        <PlaceCardOtherInfoTextS>{`Ср. чек: ${data.avgReceipt}`}</PlaceCardOtherInfoTextS>
      </PlaceCardOtherInfoContainerS>
    </PlaceCardContainerS>
  );
};
