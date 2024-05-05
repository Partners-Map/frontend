import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetAvgPricesRangesQuery } from '../../__data__/services/avg-price';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { FiltersContainerS } from '../../styles/filters';
import { Select, SelectOption } from '../select';

type FiltersPrps = {
  haveCategory?: boolean;
};

export const Filters: FunctionComponent<FiltersPrps> = ({ haveCategory }): JSX.Element => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { data: avgPrices } = useGetAvgPricesRangesQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const priceRange = searchParams.get('priceRange');
  const category = searchParams.get('category');
  const [categoriesVariances, setCategoriesVariances] = useState<SelectOption[]>([]);
  const [avgPriceRanges, setAvgPriceRanges] = useState<SelectOption[]>([]);

  const handlerSelectCategory = (option: SelectOption): void => {
    const currentParams = Object.fromEntries(searchParams);
    currentParams.category = option.value;
    setSearchParams(currentParams);
  };

  const handlerSelectAvgPrice = (option: SelectOption): void => {
    const currentParams = Object.fromEntries(searchParams);
    currentParams.priceRange = option.value;
    setSearchParams(currentParams);
  };

  useEffect(() => {
    if (haveCategory && categories && !isLoading) {
      setCategoriesVariances(
        categories.map(item => ({
          value: item.id,
          label: item.title
        }))
      );
    }
  }, [categories, haveCategory, isLoading]);

  useEffect(() => {
    if (avgPrices) {
      setAvgPriceRanges(
        avgPrices.map(item => ({
          value: item.startOfRange,
          label: item.symbol
        }))
      );
    }
  }, [avgPrices]);

  return (
    <FiltersContainerS>
      {haveCategory && (
        <Select
          options={categoriesVariances}
          styleContainer={{ width: '90vw' }}
          placeholder={'Категория'}
          onChange={handlerSelectCategory}
        />
      )}
      <Select options={avgPriceRanges} placeholder={'Диапазон'} onChange={handlerSelectAvgPrice} />
    </FiltersContainerS>
  );
};
