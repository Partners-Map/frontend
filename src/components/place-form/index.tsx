import { FunctionComponent } from 'react';
import { PlaceFormContainerS } from '../../styles/place-form';
import { DiscountCreationBlock } from '../discount-creation-block';
import { PlaceCreationBlock } from '../place-creation-block';

export const PlaceForm: FunctionComponent = (): JSX.Element => {
  return (
    <PlaceFormContainerS>
      <PlaceCreationBlock />
      <DiscountCreationBlock />
    </PlaceFormContainerS>
  );
};
