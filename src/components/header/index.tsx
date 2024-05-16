import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routers';
import { HeaderContainerS, HeaderTextS } from '../../styles/header';
import { Logo } from '../logo';
import { Search } from '../search';

export type HeaderProps = {
  isAdmin?: boolean;
  v2?: boolean;
};

// TODO mui
export const Header: FunctionComponent<HeaderProps> = ({ isAdmin, v2 = false }): JSX.Element => {
  const navigate = useNavigate();

  const handlerBack = (): void => {
    navigate(RoutesList.HomePage);
  };

  return (
    <HeaderContainerS v2={v2}>
      <Logo />
      {!v2 &&
        (isAdmin ? (
          <HeaderTextS onClick={handlerBack}>Перейти на главную</HeaderTextS>
        ) : (
          <Search />
        ))}
    </HeaderContainerS>
  );
};
