import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPlacesWithAddressQuery } from '../../__data__/services/place';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { MapWrapper } from '../../components/map-wrapper';
import { useMap } from '../../hooks/map';
import { RoutesList } from '../../routers';
import { PageContainerS } from '../../styles/page-container';

export const MapPage: FunctionComponent = (): JSX.Element => {
  const { data: placesWithAddress } = useGetPlacesWithAddressQuery();
  const navigate = useNavigate();

  const map = useMap({
    options: {
      center: [39.7257, 43.5992],
      zoom: 9
    }
  });

  useEffect(() => {
    if (!map || !placesWithAddress) return;

    placesWithAddress.forEach(place => {
      if (place.address.length === 0) return;

      place.address.forEach(adds => {
        new map.mapglAPI.Marker(map.map, {
          coordinates: [Number(adds.longitude), Number(adds.latitude)]
        }).on('click', () => {
          navigate(RoutesList.PlacePage + place.id);
        });
      });
    });
  }, [map, placesWithAddress]);

  return (
    <PageContainerS>
      <Header />
      <Filters inMapPage={true} />
      <div
        style={{
          height: '70vh',
          margin: '4vh 0 0 0'
        }}
      >
        <MapWrapper />
      </div>
    </PageContainerS>
  );
};
