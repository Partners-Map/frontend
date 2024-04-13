import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routers';
import { LogoContainerS, TitleS } from '../../styles/logo';
import LogoIcon from '/public/icons/logo.svg?react';

export const Logo: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  const handlerClick = (): void => {
    navigate(RoutesList.MainPage);
  };

  return (
    <LogoContainerS onClick={handlerClick}>
      <LogoIcon
        width='30'
        height='30'
        style={{
          margin: '0 2vw 0 0'
        }}
      />
      <TitleS>ИТ порт Сочи</TitleS>
    </LogoContainerS>
  );
};
