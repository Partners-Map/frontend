import { FunctionComponent } from 'react';
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

export const Filters: FunctionComponent = (): JSX.Element => {
  return (
    <div
      style={{
        margin: '4vh 0 0 0',
        display: 'flex',
        flexDirection: 'row',
        gap: '1vw'
      }}
    >
      <Select options={priceVariances} />
      <Select options={openVariances} />
    </div>
  );
};
