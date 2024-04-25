import { FunctionComponent } from 'react';
import { useGetAvgPriceByIdQuery } from '../../__data__/services/avg-price';
import { NewPlaceState } from '../../__data__/slices/new-place';
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
import { useGetCategoryByIdQuery } from '../../__data__/services/category';

export type PlaceCreateInfoProps = {
  data: NewPlaceState;
};

export const PlaceCreateInfo: FunctionComponent<PlaceCreateInfoProps> = ({ data }): JSX.Element => {
  const { data: minAvgPrice } = useGetAvgPriceByIdQuery(data.place.minAvgPriceId);
  const { data: maxAvgPrice } = useGetAvgPriceByIdQuery(data.place.maxAvgPriceId);
  const { data: category } = useGetCategoryByIdQuery(data.categoryId);

  return (
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
        <ul>
          <li>{condition}</li>
        </ul>
      ))}
      <PlaceInfoConditionsText></PlaceInfoConditionsText>
    </PlaceInfoContainer>
  );
};
