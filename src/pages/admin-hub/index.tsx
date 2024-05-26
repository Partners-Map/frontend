import { ListItem, Paper, Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TAdminFunctionalityPage } from '../../@types/admin';
import { AdminFunctionalityPages } from '../../configs/admin';
import { PageContainerS } from '../../styles/pages';

export const AdminHub: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();

  const handlerGoTo = (functionality: TAdminFunctionalityPage): void => {
    navigate(functionality.path);
  };

  return (
    <PageContainerS
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      {AdminFunctionalityPages.map(functionality => (
        <Paper
          elevation={6}
          sx={{
            flexGrow: '1',
            margin: '2vh 0 2vh 0',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <ListItem
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
            onClick={() => handlerGoTo(functionality)}
          >
            <Typography variant='h4' color={'primary'}>
              {functionality.title}
            </Typography>
          </ListItem>
        </Paper>
      ))}
    </PageContainerS>
  );
};
