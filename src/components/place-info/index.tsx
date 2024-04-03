import { load } from '@2gis/mapgl';
import { FunctionComponent, useEffect } from 'react';
import { TPlace } from '../../@types/models/place';
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
import { MapWrapper } from '../map-wrapper';
import { useGetPlacesWithAddressQuery } from '../../__data__/services/place';

type PlaceInfoProps = {
  data: TPlace;
};

export const PlaceInfo: FunctionComponent<PlaceInfoProps> = ({ data }): JSX.Element => {
  useEffect(() => {
    let map: any;
    load().then(mapglAPI => {
      map = new mapglAPI.Map('map-container', {
        center: [39.7257, 43.5992],
        zoom: 10,
        key: 'ab751225-efc7-4674-abc5-9d2a5f7f233b'
      });
    });
    return () => map && map.destroy();
  }, []);

  return (
    <PlaceInfoContainer>
      <PlaceInfoTitle>{data.title}</PlaceInfoTitle>
      <div
        style={{
          margin: '2vh 0 0 0'
        }}
      >
        <PlaceInfoCategory>Рестораны, кафе и кофейни</PlaceInfoCategory>
        <PlaceInfoExtraContainer>
          <PlaceInfoExtraText>{'Время работы: 09:00 - 23:00'}</PlaceInfoExtraText>
          <PlaceInfoExtraText>{`Ср. чек: ${data.avgReceipt}`}</PlaceInfoExtraText>
        </PlaceInfoExtraContainer>
      </div>

      {data.description && (
        <>
          <PlaceInfoDescription>Описание</PlaceInfoDescription>
          <PlaceInfoDescriptionText>{data.description}</PlaceInfoDescriptionText>
        </>
      )}
      <PlaceInfoConditions>Условия получения</PlaceInfoConditions>
      <PlaceInfoConditionsText>
        Предлагая разнообразное меню, "Променад" - ресторан в Сочи, который учитывает разнообразные вкусы и
        предпочтения, обеспечивая удовлетворительный обед для всех. Этот ресторан в Сочи специализируется на
        местной кухне, используя ингредиенты из собственной теплицы для придания подлинности и уникальности
        своим блюдам. Обладатель звезды Мишлен, пространство разделено тематически между уютным первым этажом
        и ярким вторым этажом.
      </PlaceInfoConditionsText>

      <div
        style={{
          height: '40vh'
        }}
      >
        <MapWrapper />
      </div>
    </PlaceInfoContainer>
  );
};
