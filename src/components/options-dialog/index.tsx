import { Dialog, DialogTitle, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { FunctionComponent } from 'react';

export type OptionsDialogProps = {
  open: boolean;
  selectedValue: OptionsDialogVariants | '';
  onClose: (value: OptionsDialogVariants | '') => void;
};

export type OptionsDialogVariants = 'edit' | 'delete';

export const OptionsDialog: FunctionComponent<OptionsDialogProps> = ({
  onClose,
  selectedValue,
  open
}) => {
  const handleClose = (): void => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: OptionsDialogVariants): void => {
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
