import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPlacesWithAddressQuery } from '../../__data__/services/place';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { MapWrapper } from '../../components/map-wrapper';
import { useMap } from '../../hooks/map';
import { RoutesList } from '../../routers';
import { PageContainerS } from '../../styles/page-container';

//TODO: фильтрация
//TODO: сохранение фильтрации при преходе с главной
export const MapPage: FunctionComponent = (): JSX.Element => {
  const { data: placesWithAddress } = useGetPlacesWithAddressQuery();
  const baseLongitude = 39.7257;
  const baseLatitude = 43.5992;
  const navigate = useNavigate();

  const map = useMap({
    options: {
      center: [baseLongitude, baseLatitude],
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
