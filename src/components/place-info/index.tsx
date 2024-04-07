import { FunctionComponent } from 'react';
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

type PlaceInfoProps = {
  data: TPlace;
};

export const PlaceInfo: FunctionComponent<PlaceInfoProps> = ({ data }): JSX.Element => {
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
        Предлагая разнообразное меню, "Променад" - ресторан в Сочи, который учитывает разнообразные
        вкусы и предпочтения, обеспечивая удовлетворительный обед для всех. Этот ресторан в Сочи
        специализируется на местной кухне, используя ингредиенты из собственной теплицы для придания
        подлинности и уникальности своим блюдам. Обладатель звезды Мишлен, пространство разделено
        тематически между уютным первым этажом и ярким вторым этажом.
      </PlaceInfoConditionsText>
    </PlaceInfoContainer>
  );
};
