import { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPlaceByIdWithAddressQuery } from '../../__data__/services/place';
import { Header } from '../../components/header';
import { MapWrapper } from '../../components/map-wrapper';
import { PlaceInfo } from '../../components/place-info';
import { useMap } from '../../hooks/map';
import { PageContainerS } from '../../styles/page-container';

export const PlacePage: FunctionComponent = (): JSX.Element => {
  const { id } = useParams();
  const { data: place } = useGetPlaceByIdWithAddressQuery(id ?? '');
  const baseLongitude = 39.7257;
  const baseLatitude = 43.5992;

  const map = useMap({
    options: {
      center: [baseLongitude, baseLatitude],
      zoom: 9
    }
  });

  useEffect(() => {
    if (!map || !place) return;

    place.address.forEach(adds => {
      new map.mapglAPI.Marker(map.map, {
        coordinates: [Number(adds.longitude), Number(adds.latitude)]
      });
    });
  }, [map, place]);

  return (
    <PageContainerS>
      <Header />
      {place && <PlaceInfo data={place} />}
      <div
        style={{
          height: '20vh',
          margin: '4vh 0 0 0'
        }}
      >
        <MapWrapper />
      </div>
    </PageContainerS>
  );
};
