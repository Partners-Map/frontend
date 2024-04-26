import mapglAPI from '@2gis/mapgl/types/index';
import { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetAvgPriceByIdQuery } from '../../__data__/services/avg-price';
import { useGetCategoryByIdQuery } from '../../__data__/services/category';
import { NewPlaceState } from '../../__data__/slices/new-place';
import { useMap } from '../../hooks/map';
import {
  PlaceInfoCategory,
  PlaceInfoConditions,
  PlaceInfoConditionsText,
  PlaceInfoContainer,
  PlaceInfoDescription,
  PlaceInfoDescriptionText,
  PlaceInfoExtraContainer,
  PlaceInfoExtraText,
  PlaceInfoTitle
} from '../../styles/place-info';

export type PlaceCreateInfoProps = {
  data: NewPlaceState;
};

export const PlaceCreateInfo: FunctionComponent<PlaceCreateInfoProps> = ({ data }): JSX.Element => {
  const { data: minAvgPrice } = useGetAvgPriceByIdQuery(data.place.minAvgPriceId);
  const { data: maxAvgPrice } = useGetAvgPriceByIdQuery(data.place.maxAvgPriceId);
  const { data: category } = useGetCategoryByIdQuery(data.categoryId);
  const currentAddresses = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice.addresses
  );
  const baseLongitude = 39.7257;
  const baseLatitude = 43.5992;
  const map = useMap({
    options: {
      center: [baseLongitude, baseLatitude],
      zoom: 9
    }
  });

  useEffect(() => {
    if (!map || !currentAddresses) return;
    const markers: mapglAPI.Marker[] = [];

    currentAddresses.forEach(place => {
      const marker = new map.mapglAPI.Marker(map.map, {
        coordinates: [Number(place.longitude), Number(place.latitude)]
      });

      markers.push(marker);
    });

    return () => {
      markers.forEach(marker => marker.destroy());
    };
  }, [map, currentAddresses]);

  return (
    <>
      <PlaceInfoContainer>
        <PlaceInfoTitle>{data.place.title}</PlaceInfoTitle>
        <div
          style={{
            margin: '2vh 0 0 0'
          }}
        >
          <PlaceInfoCategory>{category?.title}</PlaceInfoCategory>
          <PlaceInfoExtraContainer>
            <PlaceInfoExtraText>
              {`Время работы: ${data.place?.openingTime} - ${data.place?.closingTime}`}
            </PlaceInfoExtraText>
            <PlaceInfoExtraText>
              {`Ср. чек: ${minAvgPrice?.symbol} ${maxAvgPrice ? `- ${maxAvgPrice?.symbol}` : ''}`}
            </PlaceInfoExtraText>
          </PlaceInfoExtraContainer>
        </div>
        <PlaceInfoDescription>Описание</PlaceInfoDescription>
        <PlaceInfoDescriptionText>{data.place?.description}</PlaceInfoDescriptionText>
        <PlaceInfoConditions>Условия получения</PlaceInfoConditions>
        {data.discount.conditions.map(condition => (
          <div
            style={{
              margin: '2vh 0 0 0'
            }}
          >
            <ol style={{}}>
              <li>
                <PlaceInfoConditionsText>{condition}</PlaceInfoConditionsText>
              </li>
            </ol>
          </div>
        ))}
        <PlaceInfoConditionsText style={{ margin: '1vh 0 0 0' }}>
          {data.discount?.information}
        </PlaceInfoConditionsText>
      </PlaceInfoContainer>
    </>
  );
};
