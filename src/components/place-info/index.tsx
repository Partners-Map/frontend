import { FunctionComponent } from 'react';
import { TPlaceWithFullInfo } from '../../@types/models/place';
import { useGetPlacesWithCategoriesQuery } from '../../__data__/services/place';
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
  data: TPlaceWithFullInfo;
};

export const PlaceInfo: FunctionComponent<PlaceInfoProps> = ({ data }): JSX.Element => {
  const { data: placeWithCategories } = useGetPlacesWithCategoriesQuery();
  return (
    <PlaceInfoContainer>
      <PlaceInfoTitle>{data.title}</PlaceInfoTitle>
      <div
        style={{
          margin: '2vh 0 0 0'
        }}
      >
        {placeWithCategories?.map(placeWithCategory => {
          if (placeWithCategory.placeId === data.id) {
            return <PlaceInfoCategory>{placeWithCategory.category.title}</PlaceInfoCategory>;
          }
        })}
        <PlaceInfoExtraContainer>
          <PlaceInfoExtraText>{`Время работы: ${data.openingTime !== '' ? data.openingTime : '09:00'} - ${data.closingTime !== '' ? data.closingTime : '23:00'}`}</PlaceInfoExtraText>
          <PlaceInfoExtraText>{`Ср. чек: ${data.minAvgPrice?.symbol} ${data.maxAvgPrice ? `- ${data.maxAvgPrice?.symbol}` : ''}`}</PlaceInfoExtraText>
        </PlaceInfoExtraContainer>
      </div>

      {data.description && (
        <>
          <PlaceInfoDescription>Описание</PlaceInfoDescription>
          <PlaceInfoDescriptionText>{data.description}</PlaceInfoDescriptionText>
        </>
      )}
      <PlaceInfoConditions>Условия получения</PlaceInfoConditions>
      <ol style={{ margin: '1vh 0 0 4vw' }}>
        {data.discount.conditions.map(condition => (
          <li>
            <PlaceInfoConditionsText>{condition}</PlaceInfoConditionsText>
          </li>
        ))}
      </ol>
      <PlaceInfoConditionsText style={{ margin: '2vh 0 0 0' }}>
        {data.discount.information}
      </PlaceInfoConditionsText>
    </PlaceInfoContainer>
  );
};
