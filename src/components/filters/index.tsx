import { FunctionComponent, useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { FiltersContainerS } from '../../styles/filters';
import { Select, SelectOption } from '../select';
import { useGetAvgPricesRangesQuery } from '../../__data__/services/avg-price';
import { useSearchParams } from 'react-router-dom';

type FiltersPrps = {
  inMapPage?: boolean;
};

export const Filters: FunctionComponent<FiltersPrps> = ({ inMapPage }): JSX.Element => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const { data: avgPrices } = useGetAvgPricesRangesQuery();
  const [categoriesVariances, setCategoriesVariances] = useState<SelectOption[]>([]);
  const [avgPriceRanges, setAvgPriceRanges] = useState<SelectOption[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlerSelectCategory = (option: SelectOption): void => {};

  const handlerSelectAvgPrice = (option: SelectOption): void => {
    const currentParams = Object.fromEntries(searchParams);
    currentParams.priceRange = option.value;
    setSearchParams(currentParams);
  };

  useEffect(() => {
    if (inMapPage && categories && !isLoading) {
      setCategoriesVariances(
        categories.map(item => ({
          value: item.id,
          label: item.title
        }))
      );
    }
  }, [categories, inMapPage, isLoading]);

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
      {inMapPage && (
        <Select
          options={categoriesVariances}
          styleContainer={{ width: '60vw' }}
          placeholder={'Выберите'}
          onChange={handlerSelectCategory}
        />
      )}
      <Select options={avgPriceRanges} placeholder={'Выберите'} onChange={handlerSelectAvgPrice} />
    </FiltersContainerS>
  );
};
