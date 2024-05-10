import { FunctionComponent, useEffect, useState } from 'react';
import { redirect, useNavigate, useSearchParams } from 'react-router-dom';
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
import { ButtonContainerS, PageContainerS } from '../../styles/pages';

export const HomePage: FunctionComponent = (): JSX.Element => {
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
    navigate(`${RoutesList.MapPage}?${searchParams.toString()}`);
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

  useEffect(() => {
    if (!categories || !placesWithFullInfo) {
      redirect(RoutesList.ServiceUnavailable);
    }
  }, [categories, placesWithFullInfo]);

  return (
    <PageContainerS maxWidth='lg'>
      <Header />
      <Banner />
      <CategoryCloud categories={categories || []} />
      <Filters />
      <PlacesList data={filteredData} />
      <ButtonContainerS>
        <Button title={'Показать на карте'} onClick={goMapPage} />
      </ButtonContainerS>
    </PageContainerS>
  );
};