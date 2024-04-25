import { UnknownAction } from '@reduxjs/toolkit';
import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDiscountTypesQuery } from '../../__data__/services/discount-type';
import {
  NewPlaceState,
  setDiscountAmount,
  setDiscountConditions,
  setDiscountDiscountTypeId,
  setDiscountInformation
} from '../../__data__/slices/new-place';
import { DiscountInfoContainerS, TitleS } from '../../styles/discount-form';
import { InputS } from '../../styles/input';
import {
  DiscountCreationBlockContainerS,
  FieldContainerS,
  FieldLabelS,
  InputWrapperS
} from '../../styles/place-form';
import { Adder, TAdderData } from '../adder';
import { Select, SelectOption } from '../select';
import { Textarea } from '../textarea';

export type TDiscountData = {
  amount: number;
  type: string;
  information: string;
};

export const DiscountCreationBlock: FunctionComponent = (): JSX.Element => {
  const currentDiscount = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice.discount
  );
  const { register, watch, setValue, getValues } = useForm<TDiscountData>({
    defaultValues: {
      amount: currentDiscount.amount,
      type: currentDiscount.discountTypeId,
      information: currentDiscount.information
    }
  });
  const { data: discountTypes } = useGetDiscountTypesQuery();
  const [transformedArray, setTransformedArray] = useState<SelectOption[]>([]);
  const [addetingError, setAddetingError] = useState<boolean>(false);
  const [addedConditions, setAddedConditions] = useState<TAdderData[]>(
    currentDiscount.conditions.map(condition => ({ label: condition }))
  );
  const dispatch = useDispatch();
  const conditions = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice.discount.conditions
  );

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

  const handlerConditionsAdder = (value: string): void => {
    if (value.length < 1) {
      setAddetingError(true);
      return;
    }
    setAddetingError(false);
    dispatch(setDiscountConditions([...conditions, value]));
    setAddedConditions([...addedConditions, { label: value }]);
  };

  const handlerDeleteCondition = (value: string): void => {
    dispatch(setDiscountConditions(conditions.filter(condition => condition !== value)));
    setAddedConditions(addedConditions.filter(condition => condition.label !== value));
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
                width: '38vw',
                height: '2vh'
              }}
              options={transformedArray}
              placeholder={'Выберите'}
              onChange={handlerDiscountTypeSelect}
            />
          </InputWrapperS>
        </FieldContainerS>
      </DiscountInfoContainerS>
      <Adder
        label={'Условие'}
        placeholder={'Условие'}
        onAdding={handlerConditionsAdder}
        addedElements={addedConditions}
        helperText='пример: "Предъявить карту резидента "Сберпорт""'
        error={addetingError}
        onDeleteItem={handlerDeleteCondition}
      />

      <Textarea title='Дополнительная информация' onChange={handlerInfoChange} />
    </DiscountCreationBlockContainerS>
  );
};
