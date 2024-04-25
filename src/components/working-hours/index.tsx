import { UnknownAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setPlaceClosingTime, setPlaceOpeningTime } from '../../__data__/slices/new-place';
import { InputS } from '../../styles/input';

type TWorkingHoursData = {
  from: string;
  to: string;
};

export const WorkingHours = (): JSX.Element => {
  const {
    register,
    getValues,
    watch,
    formState: { errors }
  } = useForm<TWorkingHoursData>();
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
      <InputS
        type='text'
        {...register('from', {
          required: true
        })}
        placeholder='От'
        maxWidth='194px'
        error={Boolean(errors.from)}
      />
      <InputS
        type='text'
        {...register('to', {
          required: true
        })}
        placeholder='До'
        maxWidth='194px'
        error={Boolean(errors.to)}
      />
    </div>
  );
};