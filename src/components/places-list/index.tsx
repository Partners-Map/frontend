import { CSSProperties, FunctionComponent } from 'react';
import { TPlaceWithAddress, TPlaceWithFullInfo } from '../../@types/models/place';
import { PlaceListContainerS } from '../../styles/place-list';
import { PlaceCard } from '../place-card';

type PlacesListProps = {
  data: TPlaceWithFullInfo[];
  style?: CSSProperties;
};

export const PlacesList: FunctionComponent<PlacesListProps> = ({ data, style }): JSX.Element => {
  return (
    <PlaceListContainerS style={style}>
      {data.map(place => (
        <PlaceCard data={place} />
      ))}
    </PlaceListContainerS>
  );
};
