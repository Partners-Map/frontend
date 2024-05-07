import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TPlaceWithAddress } from '../../@types/models/place';
import { RoutesList } from '../../routers';
import {
  PlaceCardAddressS,
  PlaceCardContainerS,
  PlaceCardDescriptionS,
  PlaceCardOtherInfoContainerS,
  PlaceCardOtherInfoTextS,
  PlaceCardTitleS
} from '../../styles/place-card';
import { useGetAvgPriceByIdQuery } from '../../__data__/services/avg-price';

type PlacesCardProps = {
  data: TPlaceWithAddress;
  isAdmin?: boolean;
};

export const PlaceCard: FunctionComponent<PlacesCardProps> = ({
  data,
  isAdmin = false
}): JSX.Element => {
  const navigate = useNavigate();
  const { data: maxAvgPrice } = useGetAvgPriceByIdQuery(data.maxAvgPriceId);
  const { data: minAvgPrice } = useGetAvgPriceByIdQuery(data.minAvgPriceId);

  const firstAddress = data.address[0];

  const handlerClickPlace = (): void => {
    if (isAdmin) {
      // navigate(`${RoutesList.EditPlace + data.id}/SelectPartner`);
      return;
    }
    navigate(RoutesList.PlacePage + data.id);
  };

  return (
    <PlaceCardContainerS onClick={handlerClickPlace}>
      <PlaceCardTitleS>{data.title}</PlaceCardTitleS>
      <PlaceCardAddressS>{`${firstAddress?.city}, ${firstAddress?.street}, ${firstAddress?.house}`}</PlaceCardAddressS>
      <PlaceCardDescriptionS>{data.description}</PlaceCardDescriptionS>
      <PlaceCardOtherInfoContainerS>
        <PlaceCardOtherInfoTextS>{'Время работы: 09:00 - 23:00'}</PlaceCardOtherInfoTextS>
        <PlaceCardOtherInfoTextS>{`Ср. чек: ${minAvgPrice?.symbol} ${maxAvgPrice ? `- ${maxAvgPrice?.symbol}` : ''}`}</PlaceCardOtherInfoTextS>
      </PlaceCardOtherInfoContainerS>
    </PlaceCardContainerS>
  );
};
