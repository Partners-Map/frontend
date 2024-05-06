import { UnknownAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  NewPlaceState,
  setPlaceClosingTime,
  setPlaceOpeningTime
} from '../../__data__/slices/new-place';
import { Input } from '../input';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: '5px'
      }}
    >
      <Input
        type='text'
        onChange={value => {
          setValue('from', value);
        }}
        value={getValues('from')}
        placeholder='От'
        title={''}
      />
      <Input
        type='text'
        onChange={value => {
          setValue('to', value);
        }}
        value={getValues('to')}
        placeholder='До'
        title={''}
      />
    </div>
  );
};
