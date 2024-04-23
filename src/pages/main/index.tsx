import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TPlaceWithFullInfo, TPlacesWithCategorie } from '../../@types/models/place';
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

  const goMapPage = (): void => {
    navigate(RoutesList.MapPage);
  };

  const filterDataByPriceRange = (data: TPlaceWithFullInfo[], priceRange: string) => {
    if (!priceRange) return data;

    return data.filter(item => {
      const minPrice = item.minAvgPrice.symbol;
      const maxPrice = item.maxAvgPrice.symbol;

      if (priceRange === 'small') return minPrice !== '₽₽₽' && maxPrice !== '₽₽₽';
      if (priceRange === 'middle') return minPrice !== '₽₽₽' && minPrice !== '₽';

      return true;
    });
  };

  const filterDataByCategory = (
    data: TPlaceWithFullInfo[],
    categoriesData: TPlacesWithCategorie[],
    categoryId: string
  ): TPlaceWithFullInfo[] => {
    const placesIds = categoriesData.map(category => {
      if (category.categoryId === categoryId) {
        return category.placeId;
      }
    });

    return data.filter(item => placesIds.includes(item.id));
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
