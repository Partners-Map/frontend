import { FunctionComponent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetAvgPricesRangesQuery } from '../../__data__/services/avg-price';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { FiltersContainerS } from '../../styles/filters';
import { SelectWrapperS } from '../../styles/pick-avg-price';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

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
    const value = event.target.value as string;
    const currentParams = Object.fromEntries(searchParams);
    currentParams[searchParam] = value;
    if (searchParam === 'category') {
      setCategory(value);
    } else {
      setAvgPriceRanges(value);
    }
    setSearchParams(currentParams);
  };

  return (
    <FiltersContainerS>
      {haveCategory && (
        <FormControl sx={{ minWidth: 120 }} size='small'>
          <InputLabel id='avgPriceLabel'>Категория</InputLabel>
          <Select
            labelId='avgPriceLabel'
            label='Категория'
            value={category}
            onChange={(e: SelectChangeEvent) => handlerSelect(e, 'category')}
          >
            {categories?.map(category => <MenuItem value={category.id}>{category.title}</MenuItem>)}
          </Select>
        </FormControl>
      )}
      <FormControl sx={{ minWidth: 120 }} size='small'>
        <InputLabel id='avgPriceLabel'>Диапазон</InputLabel>
        <Select
          labelId='avgPriceLabel'
          label='Диапазон'
          value={avgPriceRanges}
          onChange={(e: SelectChangeEvent) => handlerSelect(e, 'priceRange')}
        >
          {avgPrices?.map(avgPrice => (
            <MenuItem value={avgPrice.startOfRange}>{avgPrice.symbol}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </FiltersContainerS>
  );
};
