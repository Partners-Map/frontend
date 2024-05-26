import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateCategoryMutation } from '../../__data__/services/category';
import { Header } from '../../components/header';
import { RoutesList } from '../../routers';
import { PageContainerS } from '../../styles/pages';

export const NewCategoryPage = (): JSX.Element => {
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>('');
  const [createNewCategory] = useCreateCategoryMutation();
  const navigate = useNavigate();

  const handlerCreate = (): void => {
    if (newCategoryTitle.trimStart().trimEnd() !== '') {
      createNewCategory({ title: newCategoryTitle })
        .unwrap()
        .then(() => {
          navigate(RoutesList.СategoriesPage, { replace: true });
        });
    }
  };

  return (
    <PageContainerS>
      <Header isAdmin />
      <Button
        variant='contained'
        sx={{
          marginTop: '10%'
        }}
        onClick={() => {
          navigate(RoutesList.СategoriesPage, { replace: true });
        }}
      >
        <ChevronLeftIcon />
      </Button>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '8vh 0 0 0'
        }}
      >
        <TextField
          type='text'
          value={newCategoryTitle}
          label='Категория'
          size='small'
          fullWidth
          onChange={e => setNewCategoryTitle(e.target.value)}
        />
        <Button
          onClick={handlerCreate}
          variant='contained'
          sx={{
            margin: '10vh 0 0 0',
            maxWidth: '50vw'
          }}
        >
          Создать категорию
        </Button>
      </Box>
    </PageContainerS>
  );
};
