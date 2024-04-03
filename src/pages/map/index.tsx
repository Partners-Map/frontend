import { FunctionComponent, useEffect } from 'react';
import { useGetPlacesWithAddressQuery } from '../../__data__/services/place';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { MapWrapper } from '../../components/map-wrapper';
import { useMap } from '../../hooks/map';
import { PageContainerS } from '../../styles/page-container';

export const MapPage: FunctionComponent = (): JSX.Element => {
  const { data: placesWithAddress } = useGetPlacesWithAddressQuery();

  const map = useMap({
    options: {
      center: [39.7257, 43.5992],
      zoom: 10
    }
  });

  useEffect(() => {
    if (map) {
      const marker = new map.mapglAPI.Marker(map.map, {
        coordinates: [39.7257, 43.5992]
      });
    }
  }, [map]);

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
