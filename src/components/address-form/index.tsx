import { load } from '@2gis/mapgl';
import { FunctionComponent, useEffect } from 'react';
import { MapWrapper } from '../map-wrapper';
import { Map } from '@2gis/mapgl/types';

export const AddressForm: FunctionComponent = (): JSX.Element => {
  useEffect(() => {
    let map: Map;
    load().then(mapglAPI => {
      map = new mapglAPI.Map('map-container', {
        center: [55.31878, 25.23584],
        zoom: 13,
        key: 'Your API access key'
      });
    });
    return () => map && map.destroy();
  }, []);

  return (
    <>
      <label htmlFor=''>ada</label>
      <input type='text' />
      <MapWrapper />
    </>
  );
};
