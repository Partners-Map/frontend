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
import {
  DiscountCreationBlockContainerS,
  FieldContainerS,
  FieldLabelS,
  InputWrapperS
} from '../../styles/place-form';
import { Adder, TAdderData } from '../adder';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { SelectOption } from '../select';

export type TDiscountData = {
  amount: number;
  type: string;
  information: string;
};

type DiscountCreationBlockProps = {
  isEditing?: boolean;
};

export const DiscountCreationBlock: FunctionComponent<DiscountCreationBlockProps> = ({
  isEditing
}): JSX.Element => {
  const currentDiscount = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice.discount
  );
  const { watch, setValue, getValues } = useForm<TDiscountData>({
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

  const handlerDiscountTypeSelect = (value: string): void => {
    setValue('type', value);
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
      <Typography variant='h4' color={'primary'}>
        Cкидка
      </Typography>
      <FormControl
        fullWidth
        size='small'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '6px'
        }}
      >
        <TextField
          label={'Размер'}
          type='number'
          size='small'
          fullWidth
          onChange={e => {
            setValue('amount', Number(e.target.value));
          }}
          value={getValues('amount')}
          placeholder='Размер'
        />
        <FormControl fullWidth size='small'>
          <InputLabel id='disType'>Тип скидки</InputLabel>
          <Select
            labelId='disType'
            label='Тип скидки'
            placeholder={'Тип скидки'}
            onChange={e => handlerDiscountTypeSelect(e.target.value as string)}
          >
            {discountTypes?.map(discountType => (
              <MenuItem value={discountType.id}>{discountType.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormControl>
      <Adder
        label={'Условия'}
        placeholder={'Условие'}
        onAdding={handlerConditionsAdder}
        addedElements={addedConditions}
        helperText='пример: "Предъявить карту "Сберпорт""'
        error={addetingError}
        onDeleteItem={handlerDeleteCondition}
      />
      <TextField
        label='Дополнительная информация'
        placeholder='Дополнительная информация'
        multiline
        maxRows={6}
        minRows={4}
        onChange={e => handlerInfoChange(e.target.value as string)}
      />
    </DiscountCreationBlockContainerS>
  );
};
