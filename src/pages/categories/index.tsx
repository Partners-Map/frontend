import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';
import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { СategoriesList } from '../../components/categories-list';
import { CategoryAlertDialog } from '../../components/category-alert-dialog';
import { CategoryDialog, CategoryDialogVariants } from '../../components/category-dialog';
import { Header } from '../../components/header';
import { RoutesList } from '../../routers';
import { ButtonContainerS, PageContainerS } from '../../styles/pages';

export const СategoriesPage: FunctionComponent = (): JSX.Element => {
  const { data: categories, refetch: updatedCategoriesList } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState<CategoryDialogVariants | ''>('');
  const [selectedСategory, setSelectedСategory] = useState<string>('');

  const handlerNewCategory = (): void => {
    navigate(RoutesList.NewCategory);
  };

  const handlerDeleteCategory = (): void => {
    setOpenAlertDialog(true);
  };

  const handleCloseAlertDialog = (): void => {
    setOpenAlertDialog(false);
    updatedCategoriesList();
  };

  const goBack = (): void => {
    navigate(RoutesList.AdminHub);
  };

  const handleClickOpenDialog = (id: string): void => {
    setOpenDialog(true);
    setSelectedСategory(id);
  };

  const handleCloseDialog = (value: CategoryDialogVariants | ''): void => {
    setOpenDialog(false);
    setSelectedValue(value);
    if (value === 'delete') {
      handlerDeleteCategory();
      return;
    }
    if (value === 'edit') {
      navigate(RoutesList.EditCategory + selectedСategory);
    }
  };

  useEffect(() => {
    updatedCategoriesList();
  }, []);

  return (
    <PageContainerS>
      <Header isAdmin />
      <Button
        variant='contained'
        sx={{
          marginTop: '2vh'
        }}
        onClick={goBack}
      >
        <ChevronLeftIcon />
      </Button>
      {categories && (
        <СategoriesList
          data={categories}
          style={{ maxHeight: '64vh' }}
          onClick={handleClickOpenDialog}
        />
      )}
      <ButtonContainerS>
        <Button onClick={handlerNewCategory} variant='contained'>
          Добавить новую категорию
        </Button>
      </ButtonContainerS>
      <CategoryDialog selectedValue={selectedValue} open={openDialog} onClose={handleCloseDialog} />
      <CategoryAlertDialog
        open={openAlertDialog}
        onClose={handleCloseAlertDialog}
        id={selectedСategory}
      />
    </PageContainerS>
  );
};
