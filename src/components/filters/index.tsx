import { FunctionComponent, useState } from 'react';
import { FiltersSelectS } from '../../styles/filters';
import { Select } from '@salutejs/plasma-web';

export const Filters: FunctionComponent = (): JSX.Element => {
  const [selectFilter, setSelectFilter] = useState<string>();

  return (
    <div
      style={{
        margin: '4vh 0 0 0'
      }}
    >
      <Select
        value={selectFilter}
        items={[
          { value: 'each', label: 'Каждый' },
          { value: 'hunter', label: 'Охотник' },
          { value: 'wants', label: 'Желает' }
        ]}
        onChange={v => {
          setSelectFilter(v);
        }}
        placeholder='Выберите пример'
        style={{
          width: '50%'
        }}
      />

      {/* <FiltersSelectS defaultValue='medium'>
        <option
          value='small'
          style={{
            width: '100%'
          }}
        >
          Р
        </option>
        <option
          value='medium'
          style={{
            width: '100%'
          }}
        >
          РР
        </option>
        <option
          value='big'
          style={{
            width: '100%'
          }}
        >
          РРР
        </option>
      </FiltersSelectS>
      <FiltersSelectS defaultValue='open'>
        <option value='open'>Открыто</option>
        <option value='all'>Все</option>
      </FiltersSelectS> */}
    </div>
  );
};
