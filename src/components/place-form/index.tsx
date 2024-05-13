import { FunctionComponent } from 'react';
import { PlaceFormContainerS } from '../../styles/place-form';
import { DiscountCreationBlock } from '../discount-creation-block';
import { PlaceCreationBlock } from '../place-creation-block';

type PlaceFormProps = {
  isEditing?: boolean;
};

export const PlaceForm: FunctionComponent<PlaceFormProps> = ({ isEditing }): JSX.Element => {
  return (
    <PlaceFormContainerS>
      <PlaceCreationBlock isEditing={isEditing} />
      <DiscountCreationBlock isEditing={isEditing} />
    </PlaceFormContainerS>
  );
};
