import { useSearchParams } from 'react-router-dom';
import { TPlaceWithFullInfo, TPlacesWithCategorie } from '../../@types/models/place';

export type TuseFilter = {
  selectFilter: (param: string, value: string | number) => void;
  deleteFilter: (param: string) => void;
  findFilterValue: (param: string) => string;
  filterDataByPriceRange: (data: TPlaceWithFullInfo[], priceRange: string) => TPlaceWithFullInfo[];
  filterDataByCategory: (
    data: TPlaceWithFullInfo[],
    categoriesData: TPlacesWithCategorie[],
    categoryId: string
  ) => TPlaceWithFullInfo[];
};

export const useFilter = (): TuseFilter => {
  const [searchParams, setSearchParams] = useSearchParams();

  const findFilterValue = (param: string): string => Object.fromEntries(searchParams)[param];

  const selectFilter = (param: string, value: string | number): void => {
    const currentParams = Object.fromEntries(searchParams);
    currentParams[param] = value.toString();
    setSearchParams(currentParams);
  };

  const deleteFilter = (param: string): void => {
    const currentParams = Object.fromEntries(searchParams);
    delete currentParams[param];
    setSearchParams(currentParams);
  };

  const filterDataByPriceRange = (
    data: TPlaceWithFullInfo[],
    priceRange: string
  ): TPlaceWithFullInfo[] => {
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

  return {
    selectFilter,
    deleteFilter,
    findFilterValue,
    filterDataByPriceRange,
    filterDataByCategory
  };
};
