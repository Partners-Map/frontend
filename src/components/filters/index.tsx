import { FunctionComponent, useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { FiltersContainerS } from '../../styles/filters';
import { Select, SelectOption } from '../select';

const priceVariances = [
  {
    value: 'P',
    label: 'P'
  },
  {
    value: 'PP',
    label: 'PP'
  },
  {
    value: 'PPP',
    label: 'PPP'
  }
];

const openVariances = [
  {
    value: 'open',
    label: 'Открыто'
  },
  {
    value: 'close',
    label: 'Закрыто'
  }
];

type FiltersPrps = {
  inMapPage?: boolean;
};

export const Filters: FunctionComponent<FiltersPrps> = ({ inMapPage }): JSX.Element => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [categoriesVariances, setCategoriesVariances] = useState<SelectOption[]>([]);

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

  return (
    <FiltersContainerS>
      {inMapPage && <Select options={categoriesVariances} styleContainer={{ width: '60vw' }} />}
      <Select options={priceVariances} />
      <Select options={openVariances} />
    </FiltersContainerS>
  );
};
