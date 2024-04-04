import { FunctionComponent } from 'react';
import { HeaderContainerS } from '../../styles/header';
import { Logo } from '../logo';
import { Search } from '../search';

export const Header: FunctionComponent = (): JSX.Element => {
  return (
    <HeaderContainerS>
      <Logo />
      <Search />
    </HeaderContainerS>
  );
};
