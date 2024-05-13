import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useDeleteCategoryByIdMutation } from '../../__data__/services/category';

type CategoryAlertDialogProps = {
  open: boolean;
  onClose: () => void;
  id: string;
};

export const CategoryAlertDialog: FunctionComponent<CategoryAlertDialogProps> = ({
  open,
  onClose,
  id
}): JSX.Element => {
  const [deleteCategory] = useDeleteCategoryByIdMutation();

  const handlerDelete = async (): Promise<void> => {
    await deleteCategory(id);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Вы уверены, что хотите удалить эту категорию?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Это действие нельзя будет отменить. Подтвердите удаление, только если вы уверены в своем
          решении.
        </DialogContentText>
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Отмена
        </Button>
        <Button onClick={handlerDelete}>Удалить</Button>
      </DialogActions>
    </Dialog>
  );
};
