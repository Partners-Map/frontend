import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetAvgPricesRangesQuery } from '../../__data__/services/avg-price';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { FiltersContainerS } from '../../styles/filters';
import { SelectWrapperS } from '../../styles/pick-avg-price';
import { Select, SelectChangeEvent } from '@mui/material';

type FiltersPrps = {
  haveCategory?: boolean;
};

export const Filters: FunctionComponent<FiltersPrps> = ({ haveCategory }): JSX.Element => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { data: avgPrices } = useGetAvgPricesRangesQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  // const priceRange = searchParams.get('priceRange');
  // const category = searchParams.get('category');
  const [category, setCategory] = useState<string>('');
  const [avgPriceRanges, setAvgPriceRanges] = useState<string>('');

  const handlerSelect = (
    event: SelectChangeEvent,
    searchParam: 'category' | 'priceRange'
  ): void => {
    const currentParams = Object.fromEntries(searchParams);
    currentParams[searchParam] = event.target.value as string;
    if (searchParam === 'category') {
      setCategory(event.target.value as string);
    } else {
      setAvgPriceRanges(event.target.value as string);
    }
    setSearchParams(currentParams);
  };

  return (
    <FiltersContainerS>
      {haveCategory && (
        // <Select
        //   options={categoriesVariances}
        //   placeholder={'Категория'}
        //   onChange={handlerSelectCategory}
        // ></Select>
        <Select
          placeholder={'Категория'}
          value={category}
          onChange={(e: SelectChangeEvent) => handlerSelect(e, 'category')}
        ></Select>
      )}
      {/* <Select options={avgPriceRanges} placeholder={'Диапазон'} onChange={handlerSelectAvgPrice} /> */}
    </FiltersContainerS>
  );
};
