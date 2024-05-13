import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TPlaceWithFullInfo } from '../../@types/models/place';
import {
  useGetPlacesWithCategoriesQuery,
  useGetPlacesWithFullInfoQuery
} from '../../__data__/services/place';
import { clearEditPlace } from '../../__data__/slices/edit-place';
import { clearNewPlace } from '../../__data__/slices/new-place';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { PlacesList } from '../../components/places-list';
import { useFilter } from '../../hooks/filter';
import { RoutesList } from '../../routers';
import { ButtonContainerS, PageContainerS } from '../../styles/pages';

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
    navigate(RoutesList.NewPlace + 'SelectPartner');
  };

  const goBack = (): void => {
    navigate(RoutesList.AdminHub);
  };

  useEffect(() => {
    dispatch(clearNewPlace());
    dispatch(clearEditPlace());
  });

  return (
    <PageContainerS>
      <Header isAdmin />
      <Button
        variant='contained'
        sx={{
          marginTop: '2vh'
        }}
        onClick={goBack}
      >
        <ChevronLeftIcon />
      </Button>
      {/* TODO добавить в общую фильтрацию, поиск */}
      {/* <Search
        style={{
          margin: '4vh 0 0 0',
          width: '100%'
        }}
      /> */}
      <Filters haveCategory />
      {filteredData && <PlacesList isAdmin data={filteredData} style={{ maxHeight: '64vh' }} />}
      <ButtonContainerS>
        <Button onClick={goToNewPlace} variant='contained'>
          Добавить новое место
        </Button>
      </ButtonContainerS>
    </PageContainerS>
  );
};
