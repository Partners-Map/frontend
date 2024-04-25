import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TPlaceWithFullInfo } from '../../@types/models/place';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import {
  useGetPlacesWithCategoriesQuery,
  useGetPlacesWithFullInfoQuery
} from '../../__data__/services/place';
import { Banner } from '../../components/banner';
import { Button } from '../../components/button';
import { CategoryCloud } from '../../components/category-cloud';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { PlacesList } from '../../components/places-list';
import { useFilter } from '../../hooks/filter';
import { RoutesList } from '../../routers';
import { ButtonContainerS, PageContainerS } from '../../styles/page-container';

export const MainPage: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const { data: categories } = useGetCategoriesQuery();
  const { data: placesWithFullInfo } = useGetPlacesWithFullInfoQuery();
  const { data: placesWithCategories } = useGetPlacesWithCategoriesQuery();
  const [searchParams] = useSearchParams();
  const priceRange = searchParams.get('priceRange');
  const category = searchParams.get('category');
  const [filteredData, setFilteredData] = useState<TPlaceWithFullInfo[]>([] || placesWithFullInfo);
  const { filterDataByCategory, filterDataByPriceRange } = useFilter();

  const goMapPage = (): void => {
    navigate(RoutesList.MapPage);
  };

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

  return (
    <PageContainerS>
      <Header />
      <Banner />
      {categories && <CategoryCloud categories={categories} />}
      <Filters />
      {placesWithFullInfo && <PlacesList data={filteredData} />}
      <ButtonContainerS>
        <Button title={'Показать на карте'} onClick={goMapPage} />
      </ButtonContainerS>
    </PageContainerS>
  );
};
