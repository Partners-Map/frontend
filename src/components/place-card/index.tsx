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
import { ListItem, Typography } from '@mui/material';

type PlacesCardProps = {
  data: TPlaceWithAddress;
  isAdmin?: boolean;
  onClick: (id: string) => void;
};

export const PlaceCard: FunctionComponent<PlacesCardProps> = ({
  data,
  isAdmin = false,
  onClick
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
    <ListItem onClick={() => onClick(data.id!)}>
      <PlaceCardContainerS>
        <Typography variant='subtitle1' color='primary'>
          {data.title}
        </Typography>
        {firstAddress?.city ? (
          <Typography variant='caption'>
            {`${firstAddress.city}, ${firstAddress.street}, ${firstAddress.house}`}
          </Typography>
        ) : (
          <></>
        )}
        <Typography variant='caption'>{data.description}</Typography>
        <PlaceCardOtherInfoContainerS>
          <Typography variant='caption'>
            {data.openingTime !== ''
              ? `Время работы: ${data.openingTime} - ${data.closingTime}`
              : ''}
          </Typography>
          <Typography variant='caption'>{`Ср. чек: ${minAvgPrice?.symbol} ${maxAvgPrice ? `- ${maxAvgPrice?.symbol}` : ''}`}</Typography>
        </PlaceCardOtherInfoContainerS>
      </PlaceCardContainerS>
    </ListItem>
  );
};
