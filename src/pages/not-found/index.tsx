import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routers';

export const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();

  const handleGoHomePage = (): void => {
    navigate(RoutesList.HomePage, {
      replace: true
    });
  };

  return (
    <Container
      maxWidth='sm'
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography variant='h1'>404</Typography>
      <Typography variant='h4'>плохие новости</Typography>
      <Typography
        variant='subtitle1'
        align='center'
        sx={{
          margin: '1vh 0 0 0'
        }}
      >
        Страница, которую вы ищете, была удалена или временно недоступна.
      </Typography>
      <Button
        variant='contained'
        sx={{
          margin: '4vh 0 0 0'
        }}
        onClick={handleGoHomePage}
      >
        Вернуться на главную
      </Button>
    </Container>
  );
};
