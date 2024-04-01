import { FunctionComponent, useEffect } from 'react';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { PageContainerS } from '../../styles/page-container';
import { load } from '@2gis/mapgl';
import { MapWrapper } from '../../components/map-wrapper';

export const MapPage: FunctionComponent = (): JSX.Element => {
  useEffect(() => {
    let map: any;
    load().then(mapglAPI => {
      map = new mapglAPI.Map('map-container', {
        center: [39.7257, 43.5992],
        zoom: 10,
        key: 'ab751225-efc7-4674-abc5-9d2a5f7f233b'
      });
    });
    return () => map && map.destroy();
  }, []);

  return (
    <PageContainerS>
      <Header />
      <Filters inMapPage={true} />
      <div
        style={{
          height: '70vh'
        }}
      >
        <MapWrapper />
      </div>
    </PageContainerS>
  );
};
