import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useEditCategoryByIdMutation,
  useGetCategoryByIdQuery
} from '../../__data__/services/category';
import { Header } from '../../components/header';
import { RoutesList } from '../../routers';
import { PageContainerS } from '../../styles/pages';

export const EditCategoryPage = (): JSX.Element => {
  const [editCategory] = useEditCategoryByIdMutation();
  const { id } = useParams();
  const { data, refetch } = useGetCategoryByIdQuery(id!);
  const [editCategoryTitle, setEditCategoryTitle] = useState<string>(data?.title || '');
  const navigate = useNavigate();

  const handlerCreate = (): void => {
    if (editCategoryTitle.trimStart().trimEnd() !== '') {
      editCategory({ id: id!, title: editCategoryTitle })
        .unwrap()
        .then(() => {
          navigate(RoutesList.СategoriesPage, { replace: true });
        });
    }
  };

  useEffect(() => {
    if (data && data.title) {
      setEditCategoryTitle(data.title);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

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
          value={editCategoryTitle}
          label='Категория'
          size='small'
          fullWidth
          onChange={e => setEditCategoryTitle(e.target.value)}
        />

        <Button
          onClick={handlerCreate}
          variant='contained'
          sx={{
            margin: '10vh 0 0 0',
            maxWidth: '50vw'
          }}
        >
          Сохранить изменения
        </Button>
      </Box>
    </PageContainerS>
  );
};
