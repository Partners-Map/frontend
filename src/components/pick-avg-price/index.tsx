import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetAvgPricesQuery } from '../../__data__/services/avg-price';
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<TPickAvgPriceData>();

  const onSetMinAvgPriceId = (optin: SelectOption): void => {
    setValue('minAvgPriceId', optin.value);
  };

  const onSetMaxAvgPriceId = (optin: SelectOption): void => {
    setValue('maxAvgPriceId', optin.value);
  };

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
