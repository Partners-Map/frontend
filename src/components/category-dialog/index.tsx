import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FunctionComponent } from 'react';

type CategoryDialogProps = {
  open: boolean;
  selectedValue: CategoryDialogVariants | '';
  onClose: (value: CategoryDialogVariants | '') => void;
};

export type CategoryDialogVariants = 'edit' | 'delete';

export const CategoryDialog: FunctionComponent<CategoryDialogProps> = ({
  onClose,
  selectedValue,
  open
}): JSX.Element => {
  const handleClose = (): void => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: CategoryDialogVariants): void => {
    console.log(value);
    
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Выбор действия:</DialogTitle>
      <List>
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleListItemClick('edit')}>
            <ListItemText primary='Редактировать' />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleListItemClick('delete')}>
            <ListItemText primary='Удалить' />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};
