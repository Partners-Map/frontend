import { CSSProperties, FunctionComponent } from 'react';
import { TPlaceWithAddress, TPlaceWithFullInfo } from '../../@types/models/place';
import { PlaceListContainerS } from '../../styles/place-list';
import { PlaceCard } from '../place-card';

type PlacesListProps = {
  data: TPlaceWithFullInfo[];
  style?: CSSProperties;
  isAdmin?: boolean;
  onClick: (id: string) => void;
};

export const PlacesList: FunctionComponent<PlacesListProps> = ({
  data,
  style,
  isAdmin = false,
  onClick
}): JSX.Element => {
  return (
    <PlaceListContainerS style={style}>
      {data.map(place => (
        <PlaceCard data={place} isAdmin={isAdmin} onClick={onClick} />
      ))}
    </PlaceListContainerS>
  );
};
