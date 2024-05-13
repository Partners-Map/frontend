import { FormControl, TextField } from '@mui/material';
import { UnknownAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  NewPlaceState,
  setPlaceClosingTime,
  setPlaceOpeningTime
} from '../../__data__/slices/new-place';

type TWorkingHoursData = {
  from: string;
  to: string;
};

export const WorkingHours = (): JSX.Element => {
  const currentPlace = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice.place
  );
  const {
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm<TWorkingHoursData>({
    defaultValues: {
      from: currentPlace.openingTime,
      to: currentPlace.closingTime
    }
  });
  const dispatch = useDispatch();

  const setValueToRedux = (
    fieldName: keyof TWorkingHoursData,
    actionCreator: (data: string) => UnknownAction
  ): void => {
    const value = getValues(fieldName);
    if (value) {
      dispatch(actionCreator(value));
    }
  };

  useEffect(() => {
    setValueToRedux('from', setPlaceOpeningTime);
    setValueToRedux('to', setPlaceClosingTime);
  }, [watch()]);

  return (
    <FormControl
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: '6px'
      }}
      size='small'
    >
      <TextField
        type='text'
        onChange={e => {
          setValue('from', e.target.value as string);
        }}
        value={getValues('from')}
        placeholder='C'
        fullWidth
        size='small'
        label='C'
      />
      <TextField
        type='text'
        onChange={e => {
          setValue('to', e.target.value as string);
        }}
        value={getValues('to')}
        placeholder='До'
        fullWidth
        size='small'
        label='До'
      />
    </FormControl>
  );
};
