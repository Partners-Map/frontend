import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetDiscountTypesQuery } from '../../__data__/services/discount-type';
import { DiscountInfoContainerS, TitleS } from '../../styles/discount-form';
import { InputS } from '../../styles/input';
import {
  DiscountCreationBlockContainerS,
  FieldContainerS,
  FieldLabelS,
  InputWrapperS
} from '../../styles/place-form';
import { Adder } from '../adder';
import { Select, SelectOption } from '../select';
import { Textarea } from '../textarea';
import { UnknownAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  setDiscountAmount,
  setDiscountDiscountTypeId,
  setDiscountInformation
} from '../../__data__/slices/new-place';

export type TDiscountData = {
  amount: number;
  type: string;
  information: string;
};

export const DiscountCreationBlock: FunctionComponent = (): JSX.Element => {
  const { register, watch, setValue, getValues } = useForm<TDiscountData>();
  const { data: discountTypes } = useGetDiscountTypesQuery();
  const [transformedArray, setTransformedArray] = useState<SelectOption[]>([]);
  const dispatch = useDispatch();

  const handlerDiscountTypeSelect = (option: SelectOption): void => {
    setValue('type', option.value);
  };

  const handlerInfoChange = (value: string): void => {
    setValue('information', value);
  };

  const setValueToRedux = (
    fieldName: keyof TDiscountData,
    actionCreator: (data: string) => UnknownAction
  ): void => {
    const value = getValues(fieldName);
    if (value && typeof value === 'string') {
      dispatch(actionCreator(value));
    }
  };

  useEffect(() => {
    dispatch(setDiscountAmount(getValues('amount')));
    setValueToRedux('type', setDiscountDiscountTypeId);
    setValueToRedux('information', setDiscountInformation);
  }, [watch()]);

  useEffect(() => {
    if (discountTypes) {
      const newTransformedArray = discountTypes.map(discountType => ({
        value: discountType.id,
        label: discountType.title
      }));
      setTransformedArray(newTransformedArray);
    }
  }, [discountTypes]);

  return (
    <DiscountCreationBlockContainerS>
      <TitleS>Добавить скидку</TitleS>
      <DiscountInfoContainerS>
        <FieldContainerS>
          <FieldLabelS>Количество</FieldLabelS>
          <InputWrapperS style={{ height: '2vh' }}>
            <InputS
              type='text'
              {...register('amount', { required: true })}
              placeholder='Количество'
            />
          </InputWrapperS>
        </FieldContainerS>
        <FieldContainerS>
          <FieldLabelS>Тип скидки</FieldLabelS>
          <InputWrapperS>
            <Select
              styleContainer={{
                maxWidth: '400px',
                minWidth: '40vw',
                height: '2vh'
              }}
              options={transformedArray}
              placeholder={'Выберите'}
              onChange={handlerDiscountTypeSelect}
            />
          </InputWrapperS>
        </FieldContainerS>
      </DiscountInfoContainerS>
      <Adder label={'Условие'} placeholder={'Условие'} isCondition />
      <Textarea title='Дополнительная информация' onChange={handlerInfoChange} />
    </DiscountCreationBlockContainerS>
  );
};
