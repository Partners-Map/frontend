import { memo } from 'react';

export const MapWrapper = memo(
  () => {
    return <div id='map-container' style={{ width: '100%', height: '70vh', margin: '4vh 0 0 0' }}></div>;
  },
  () => true
);
