import AddIcon from '@mui/icons-material/Add';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';
import { CSSProperties, FunctionComponent, useState } from 'react';
import { AdderContainerS, ListS } from '../../styles/adder';
import TrashIcon from '/public/icons/trash.svg?react';

type AdderProps = {
  label: string;
  placeholder?: string;
  onAdding: (value: string) => void;
  onDeleteItem: (value: string) => void;
  addedElements: string[];
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
          error={error}
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
              {item}
            </Typography>
            <TrashIcon width={24} height={24} onClick={() => onDeleteItem(item)} />
          </Box>
        ))}
      </ListS>
    </AdderContainerS>
  );
};
