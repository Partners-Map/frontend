import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TPlaceWithFullInfo } from '../../@types/models/place';
import {
  useGetPlacesWithCategoriesQuery,
  useGetPlacesWithFullInfoQuery
} from '../../__data__/services/place';
import { clearNewPlace } from '../../__data__/slices/new-place';
import { Button } from '../../components/button';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { PlacesList } from '../../components/places-list';
import { Search } from '../../components/search';
import { useFilter } from '../../hooks/filter';
import { RoutesList } from '../../routers';
import { ButtonContainerS, PageContainerS } from '../../styles/page-container';

export const PlacesPage: FunctionComponent = () => {
  const { data: placesWithFullInfo } = useGetPlacesWithFullInfoQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState<TPlaceWithFullInfo[]>([] || placesWithFullInfo);
  const { data: placesWithCategories } = useGetPlacesWithCategoriesQuery();
  const { filterDataByCategory, filterDataByPriceRange } = useFilter();
  const [searchParams] = useSearchParams();
  const priceRange = searchParams.get('priceRange');
  const category = searchParams.get('category');

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

  const goToNewPlace = (): void => {
    navigate(RoutesList.NewPlace + 1);
  };

  useEffect(() => {
    dispatch(clearNewPlace());
  });

  return (
    <PageContainerS>
      <Header isAdmin />
      <Search
        style={{
          margin: '4vh 0 0 0',
          width: '100%'
        }}
      />
      <Filters haveCategory />
      {filteredData && <PlacesList data={filteredData} style={{ maxHeight: '62vh' }} />}
      <ButtonContainerS>
        <Button title={'Добавить новое место'} onClick={goToNewPlace} />
      </ButtonContainerS>
    </PageContainerS>
  );
};
