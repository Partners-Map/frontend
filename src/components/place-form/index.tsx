import { FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import { RoutesList } from '../../routers';
import { PlaceFormContainerS } from '../../styles/place-form';
import { DiscountCreationBlock } from '../discount-creation-block';
import { PlaceCreationBlock } from '../place-creation-block';

export const PlaceForm: FunctionComponent = (): JSX.Element => {
  const isEditing = useLocation().pathname.startsWith(RoutesList.EditPlace);

  return (
    <PlaceFormContainerS>
      <PlaceCreationBlock isEditing={isEditing} />
      <DiscountCreationBlock isEditing={isEditing} />
    </PlaceFormContainerS>
  );
};
