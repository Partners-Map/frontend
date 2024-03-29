import { FunctionComponent } from 'react';
import LogoIcon from '/public/icons/logo.svg?react';
import { LogoContainerS, TitleS } from '../../styles/logo';

export const Logo: FunctionComponent = (): JSX.Element => {
  return (
    <LogoContainerS>
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
