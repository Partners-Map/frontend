import { load } from '@2gis/mapgl';
import { FunctionComponent, useEffect } from 'react';
import { MapWrapper } from '../map-wrapper';
import { Map } from '@2gis/mapgl/types';
import { useMap } from '../../hooks/map';

export const AddressForm: FunctionComponent = (): JSX.Element => {
  const baseLongitude = 39.7257;
  const baseLatitude = 43.5992;
  const map = useMap({
    options: {
      center: [baseLongitude, baseLatitude],
      zoom: 9
    }
  });

  return (
    <>
      <div>
        <label htmlFor=''>ada</label>
        <input type='text' id='' />
      </div>

      <div
        style={{
          height: '40vh',
          margin: '4vh 0 0 0'
        }}
      >
        <MapWrapper />
      </div>
    </>
  );
};
