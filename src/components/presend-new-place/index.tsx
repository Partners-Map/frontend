import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../__data__/store';
import { RoutesList } from '../../routers';
import { MapWrapper } from '../map-wrapper';
import { PlaceCreateInfo } from '../place-create-info';

export const PresendNewPlace = (): JSX.Element => {
  const isEditing = useLocation().pathname.startsWith(RoutesList.EditPlace);
  const { newPlaceSlice: newPlaceState, editPlaceSlice: editPlaceState } = useSelector(
    (state: RootState) => state
  );

  return (
    <>
      <PlaceCreateInfo data={isEditing ? editPlaceState : newPlaceState} />
      <div
        style={{
          height: '32vh',
          margin: '2vh 0 0 0'
        }}
      >
        <MapWrapper />
      </div>
    </>
  );
};
