import { FunctionComponent } from 'react';
import { HeaderContainerS, HeaderTextS } from '../../styles/header';
import { Logo } from '../logo';
import { Search } from '../search';

export type HeaderProps = {
  isAdmin?: boolean;
  v2?: boolean;
};

export const Header: FunctionComponent<HeaderProps> = ({ isAdmin, v2 = false }): JSX.Element => {
  return (
    <HeaderContainerS v2={v2}>
      <Logo />
      {!v2 && (isAdmin ? <HeaderTextS>Перейти на главную</HeaderTextS> : <Search />)}
    </HeaderContainerS>
  );
};
