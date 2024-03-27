import { FunctionComponent } from 'react';
import LogoIcon from '/public/icons/logo.svg?react';
import { SearchField } from '../search-field';
import { TitleS } from '../../styles/header';

export const Header: FunctionComponent = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2vh 0 0 0'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <LogoIcon
          width='30'
          height='30'
          style={{
            margin: '0 2vw 0 0'
          }}
        />
        <TitleS>ИТ порт Сочи</TitleS>
      </div>

      <SearchField />
    </div>
  );
};
