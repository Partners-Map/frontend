import mapglAPI from '@2gis/mapgl/types/index';
import { Box, Typography } from '@mui/material';
import { FunctionComponent, useEffect } from 'react';
import { useGetAvgPriceByIdQuery } from '../../__data__/services/avg-price';
import { useGetCategoryByIdQuery } from '../../__data__/services/category';
import { EditPlaceState } from '../../__data__/slices/edit-place';
import { NewPlaceState } from '../../__data__/slices/new-place';
import { useMap } from '../../hooks/map';
import { PlaceInfoContainer, PlaceInfoExtraContainer } from '../../styles/place-info';

export type PlaceCreateInfoProps = {
  data: NewPlaceState | EditPlaceState;
};

export const PlaceCreateInfo: FunctionComponent<PlaceCreateInfoProps> = ({ data }): JSX.Element => {
  const { data: minAvgPrice } = useGetAvgPriceByIdQuery(data.place.minAvgPriceId);
  const { data: maxAvgPrice } = useGetAvgPriceByIdQuery(data.place.maxAvgPriceId);
  const { data: category } = useGetCategoryByIdQuery(data.categoryId);
  const baseLongitude = 39.7257;
  const baseLatitude = 43.5992;
  const map = useMap({
    options: {
      center: [baseLongitude, baseLatitude],
      zoom: 9
    }
  });

  useEffect(() => {
    if (!map || !data.addresses) return;
    const markers: mapglAPI.Marker[] = [];

    data.addresses.forEach(place => {
      const marker = new map.mapglAPI.Marker(map.map, {
        coordinates: [Number(place.longitude), Number(place.latitude)]
      });

      markers.push(marker);
    });

    return () => {
      markers.forEach(marker => marker.destroy());
    };
  }, [map, data]);

  return (
    <>
      <PlaceInfoContainer>
        <Typography variant='h3'>{data.place.title}</Typography>
        <Box
          sx={{
            margin: '2vh 0 0 0'
          }}
        >
          {category && <Typography variant='body2'>{category.title}</Typography>}
          <PlaceInfoExtraContainer>
            {data.place.openingTime !== '' ? (
              <Typography variant='body2'>
                {`Время работы: ${data.place.openingTime} - ${data.place.closingTime}`}
              </Typography>
            ) : null}
            {minAvgPrice && (
              <Typography variant='body2'>{`Ср. чек: ${minAvgPrice.symbol} ${maxAvgPrice ? `- ${maxAvgPrice.symbol}` : ''}`}</Typography>
            )}
          </PlaceInfoExtraContainer>
        </Box>
        {data.place.description && (
          <>
            <Typography variant='subtitle1'>Описание</Typography>
            <Typography variant='body1'>{data.place.description}</Typography>
          </>
        )}
        <Typography
          variant='subtitle1'
          sx={{
            margin: '1.2vh 0 0 0'
          }}
        >
          Условия получения
        </Typography>
        <ol style={{ margin: '1vh 0 0 4vw' }}>
          {data.discount.conditions.map(condition => (
            <li>
              <Typography variant='body1'>{condition}</Typography>
            </li>
          ))}
        </ol>
        <Typography variant='body2' style={{ margin: '2vh 0 0 0' }}>
          {data.discount.information}
        </Typography>
      </PlaceInfoContainer>
    </>
  );
};
