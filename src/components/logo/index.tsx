import { Button, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routers';
import LogoIcon from '/public/icons/logo.svg?react';

export const Logo: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  const handlerClick = (): void => {
    navigate(RoutesList.HomePage);
  };

  return (
    <Button onClick={handlerClick} startIcon={<LogoIcon width='30' height='30' />}>
      <Typography variant='h6'>ИТ порт Сочи</Typography>
    </Button>
  );
};
