import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { UnknownAction } from '@reduxjs/toolkit';
import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useGetAvgPricesQuery } from '../../__data__/services/avg-price';
import { setPlaceMaxAvgPriceId, setPlaceMinAvgPriceId } from '../../__data__/slices/new-place';
import { SelectOption } from '../select';

type TPickAvgPriceData = {
  minAvgPriceId: string;
  maxAvgPriceId?: string;
};

export const PickAvgPrice: FunctionComponent = (): JSX.Element => {
  const { data: avgPrices } = useGetAvgPricesQuery();
  const [disabledRangeAvgPrice, setDisabledRangeAvgPrice] = useState<boolean>(false);
  const { getValues, watch, setValue } = useForm<TPickAvgPriceData>();
  const dispatch = useDispatch();

  const setValueToRedux = (
    fieldName: keyof TPickAvgPriceData,
    actionCreator: (data: string) => UnknownAction
  ): void => {
    const value = getValues(fieldName);
    if (value) {
      dispatch(actionCreator(value));
    }
  };

  const onSetMinAvgPriceId = (value: string): void => {
    setValue('minAvgPriceId', value);
  };

  const onSetMaxAvgPriceId = (value: string): void => {
    setValue('maxAvgPriceId', value);
  };

  useEffect(() => {
    setValueToRedux('minAvgPriceId', setPlaceMinAvgPriceId);
    setValueToRedux('maxAvgPriceId', setPlaceMaxAvgPriceId);
  }, [watch()]);

  useEffect(() => {
    if (disabledRangeAvgPrice) {
      dispatch(setPlaceMaxAvgPriceId(''));
    }
  }, [disabledRangeAvgPrice]);

  return (
    <>
      <FormControl
        sx={{ minWidth: 120, display: 'flex', flexDirection: 'row', gap: '6px' }}
        size='small'
        fullWidth
      >
        <InputLabel id='avgPrice'>Средний чек</InputLabel>
        <Select
          labelId='avgPrice'
          label={'Средний чек'}
          fullWidth
          placeholder={'Выберите'}
          onChange={e => onSetMinAvgPriceId(e.target.value as string)}
        >
          {avgPrices?.map(avgPrice => <MenuItem value={avgPrice.id}>{avgPrice.symbol}</MenuItem>)}
        </Select>
        <FormControl disabled={!disabledRangeAvgPrice} fullWidth size='small'>
          <InputLabel id='avgPriceRange'>Средний чек</InputLabel>
          <Select
            labelId='avgPriceRange'
            label={'Средний чек'}
            fullWidth
            placeholder={'Выберите'}
            onChange={e => onSetMaxAvgPriceId(e.target.value as string)}
          >
            {avgPrices?.map(avgPrice => <MenuItem value={avgPrice.id}>{avgPrice.symbol}</MenuItem>)}
          </Select>
        </FormControl>
      </FormControl>
      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={disabledRangeAvgPrice}
              onChange={() => {
                setDisabledRangeAvgPrice(!disabledRangeAvgPrice);
              }}
            />
          }
          label='Выставить диапазон'
        />
      </FormControl>
    </>
  );
};
