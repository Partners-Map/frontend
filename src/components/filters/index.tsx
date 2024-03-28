import { FunctionComponent, useState } from 'react';
import { FiltersSelectS } from '../../styles/filters';
import { Select } from '../select';

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

export const Filters: FunctionComponent = (): JSX.Element => {
  const [selectFilter, setSelectFilter] = useState<string>();

  return (
    <div
      style={{
        margin: '4vh 0 0 0'
      }}
    >
      <Select options={priceVariances} />

      {/* <FiltersSelectS>
        <div style={{}}>Р</div>
        <div style={{}}>РР</div>
        <div style={{}}>РРР</div>
      </FiltersSelectS>
      <FiltersSelectS defaultValue='open'>
        <option value='open'>Открыто</option>
        <option value='all'>Все</option>
      </FiltersSelectS> */}
    </div>
  );
};
