import mapglAPI from '@2gis/mapgl/types/index';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TPlaceWithFullInfo } from '../../@types/models/place';
import {
  useGetPlacesWithCategoriesQuery,
  useGetPlacesWithFullInfoQuery
} from '../../__data__/services/place';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { MapWrapper } from '../../components/map-wrapper';
import { useFilter } from '../../hooks/filter';
import { useMap } from '../../hooks/map';
import { RoutesList } from '../../routers';
import { PageContainerS } from '../../styles/page-container';

export const MapPage: FunctionComponent = (): JSX.Element => {
  const { data: placesWithFullInfo } = useGetPlacesWithFullInfoQuery();
  const { data: placesWithCategories } = useGetPlacesWithCategoriesQuery();
  const [searchParams] = useSearchParams();
  const priceRange = searchParams.get('priceRange');
  const category = searchParams.get('category');
  const baseLongitude = 39.7257;
  const baseLatitude = 43.5992;
  const navigate = useNavigate();
  const { filterDataByCategory, filterDataByPriceRange } = useFilter();
  const map = useMap({
    options: {
      center: [baseLongitude, baseLatitude],
      zoom: 9
    }
  });
  const [filteredData, setFilteredData] = useState<TPlaceWithFullInfo[]>([] || placesWithFullInfo);

  useEffect(() => {
    if (placesWithFullInfo && placesWithCategories) {
      let filteredDataTemp = [...placesWithFullInfo];

      if (priceRange) {
        filteredDataTemp = filterDataByPriceRange(filteredDataTemp, priceRange);
      }

      if (category) {
        filteredDataTemp = filterDataByCategory(filteredDataTemp, placesWithCategories, category);
      }

      setFilteredData(filteredDataTemp);
    }
  }, [placesWithFullInfo, priceRange, category, placesWithCategories]);

  useEffect(() => {
    if (!map || !filteredData) return;
    const markers: mapglAPI.Marker[] = [];

    filteredData.forEach(place => {
      if ((place.address.length as number) === 0) return;

      place.address.forEach(adds => {
        const marker = new map.mapglAPI.Marker(map.map, {
          coordinates: [Number(adds.longitude), Number(adds.latitude)]
        }).on('click', () => {
          navigate(RoutesList.PlacePage + place.id);
        });

        markers.push(marker);
      });
    });

    return () => {
      markers.forEach(marker => marker.destroy());
    };
  }, [map, navigate, filteredData]);

  return (
    <PageContainerS>
      <Header />

      <Filters haveCategory={true} />
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
