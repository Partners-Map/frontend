import { FunctionComponent } from 'react';
import { TPlaceWithAddress } from '../../@types/models/place';
import { PlaceListContainerS } from '../../styles/place-list';
import { PlaceCard } from '../place-card';

type PlacesListProps = {
  data: TPlaceWithAddress[];
};

export const PlacesList: FunctionComponent<PlacesListProps> = ({ data }): JSX.Element => {
  return (
    <PlaceListContainerS>
      {data.map(place => (
        <PlaceCard data={place} />
      ))}
    </PlaceListContainerS>
  );
};
