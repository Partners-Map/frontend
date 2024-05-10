import { useSelector } from 'react-redux';
import { NewPlaceState } from '../../__data__/slices/new-place';
import { PageContainerS } from '../../styles/pages';
import { Header } from '../header';
import { MapWrapper } from '../map-wrapper';
import { PlaceCreateInfo } from '../place-create-info';

export const PresendNewPlace = () => {
  const addedPlace = useSelector((state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice);

  return (
    <>
      {addedPlace && <PlaceCreateInfo data={addedPlace} />}
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
