import { FunctionComponent } from 'react';
import { LogoIcon } from '../logo-icon';
import { SearchField } from '../search-field';

export const Header: FunctionComponent = (): JSX.Element => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <LogoIcon />
        <h3>ИТ порт Сочи</h3>
      </div>

      <SearchField />
    </div>
  );
};
