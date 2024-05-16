import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { FunctionComponent } from 'react';
import { useDeleteCategoryByIdMutation } from '../../__data__/services/category';
import { useDeletePlaceByIdMutation } from '../../__data__/services/place';

type CategoryAlertDialogProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  isPlace?: boolean;
};

export const CategoryAlertDialog: FunctionComponent<CategoryAlertDialogProps> = ({
  open,
  onClose,
  id,
  isPlace
}): JSX.Element => {
  const [deleteCategory] = useDeleteCategoryByIdMutation();
  const [deletePlace] = useDeletePlaceByIdMutation();

  const handlerDelete = async (): Promise<void> => {
    if (isPlace) {
      await deletePlace(id);
    } else {
      await deleteCategory(id);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{`Вы уверены, что хотите удалить ${isPlace ? 'это заведение' : 'эту категорию'}?`}</DialogTitle>
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
