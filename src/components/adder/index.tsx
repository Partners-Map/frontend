import { CSSProperties, FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NewPlaceState } from '../../__data__/slices/new-place';
import {
  AddedItemTitleS,
  AdderContainerS,
  AdderHelperTextS,
  AdderLabelS,
  ListS
} from '../../styles/adder';
import TrashIcon from '/public/icons/trash.svg?react';
import WhitePlusIcon from '/public/icons/white-plus-icon.svg?react';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type AdderProps = {
  label: string;
  placeholder?: string;
  onAdding: (value: string) => void;
  onDeleteItem: (value: string) => void;
  addedElements: TAdderData[];
  listStyle?: CSSProperties;
  error?: boolean;
  helperText?: string;
};

export type TAdderData = {
  label: string;
};

export const Adder: FunctionComponent<AdderProps> = ({
  label,
  placeholder = ' ',
  onAdding,
  addedElements = [],
  listStyle,
  error,
  helperText,
  onDeleteItem
}): JSX.Element => {
  const [addedTitle, setAddedTitle] = useState<string>('');
  const dispatch = useDispatch();
  const addresses = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice.addresses
  );

  const handlerAdd = (): void => {
    const clearAddedTitle = addedTitle.trimStart().trimEnd();
    if (clearAddedTitle === '') return;
    onAdding(clearAddedTitle);
    setAddedTitle('');
  };

  return (
    <AdderContainerS>
      <Typography variant={'subtitle1'} color={'primary'}>
        {label}
      </Typography>
      <FormControl
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '6px'
        }}
      >
        <TextField
          title={''}
          type='text'
          size='small'
          onChange={e => setAddedTitle(e.target.value as string)}
          value={addedTitle}
          placeholder={placeholder}
          helperText={helperText}
          fullWidth
        />
        <Button variant='contained' onClick={handlerAdd} size='small'>
          <AddIcon />
        </Button>
      </FormControl>
      <ListS style={listStyle}>
        {addedElements.map(item => (
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '10px'
            }}
          >
            <Typography variant={'body1'} color={'primary'}>
              {item.label}
            </Typography>
            <TrashIcon width={24} height={24} onClick={() => onDeleteItem(item.label)} />
          </Box>
        ))}
      </ListS>
    </AdderContainerS>
  );
};
