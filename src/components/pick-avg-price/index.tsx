import { UnknownAction } from '@reduxjs/toolkit';
import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useGetAvgPricesQuery } from '../../__data__/services/avg-price';
import { setPlaceMaxAvgPriceId, setPlaceMinAvgPriceId } from '../../__data__/slices/new-place';
import { SelectWrapperS } from '../../styles/pick-avg-price';
import { FieldLabelS } from '../../styles/place-form';
import { Select, SelectOption } from '../select';

type TPickAvgPriceData = {
  minAvgPriceId: string;
  maxAvgPriceId?: string;
};

export const PickAvgPrice: FunctionComponent = (): JSX.Element => {
  const { data: avgPrices } = useGetAvgPricesQuery();
  const [transformAvgPrices, setTransformAvgPrices] = useState<SelectOption[]>([]);
  const [disabledRangeAvgPrice, setDisabledRangeAvgPrice] = useState<boolean>(true);
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

  const onSetMinAvgPriceId = (optin: SelectOption): void => {
    setValue('minAvgPriceId', optin.value);
  };

  const onSetMaxAvgPriceId = (optin: SelectOption): void => {
    setValue('maxAvgPriceId', optin.value);
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

  useEffect(() => {
    if (avgPrices) {
      setTransformAvgPrices(
        avgPrices.map(price => {
          return {
            value: price.id,
            label: price.symbol,
            areaLabel: price.slug
          };
        })
      );
    }
  }, [avgPrices]);

  return (
    <>
      <FieldLabelS>Средний чек</FieldLabelS>
      <SelectWrapperS>
        <Select
          styleContainer={{
            minWidth: '40vw'
          }}
          options={transformAvgPrices}
          placeholder={'Выберите'}
          onChange={onSetMinAvgPriceId}
        />
        <Select
          styleContainer={{
            minWidth: '40vw'
          }}
          options={transformAvgPrices}
          placeholder={'Выберите'}
          disabled={disabledRangeAvgPrice}
          onChange={onSetMaxAvgPriceId}
        />
      </SelectWrapperS>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '6px',
          padding: '1vw 2vw 1vw 1vw'
        }}
      >
        <input
          type='checkbox'
          id='minAvgPriceId'
          name='minAvgPriceId'
          onChange={() => {
            setDisabledRangeAvgPrice(!disabledRangeAvgPrice);
          }}
        />
        <label htmlFor='minAvgPriceId'>выставить диапазон</label>
      </div>
    </>
  );
};
