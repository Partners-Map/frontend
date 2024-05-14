import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetDiscountTypesQuery } from '../../__data__/services/discount-type';
import {
  setDiscountAmount as setEditPlaceDiscountAmount,
  setDiscountConditions as setEditPlaceDiscountConditions,
  setDiscountDiscountTypeId as setEditPlaceDiscountDiscountTypeId,
  setDiscountInformation as setEditPlaceDiscountInformation
} from '../../__data__/slices/edit-place';
import {
  setDiscountAmount as setNewPlaceDiscountAmount,
  setDiscountConditions as setNewPlaceDiscountConditions,
  setDiscountDiscountTypeId as setNewPlaceDiscountDiscountTypeId,
  setDiscountInformation as setNewPlaceDiscountInformation
} from '../../__data__/slices/new-place';

import { TNewDiscount } from '../../@types/models/discount';
import { RootState } from '../../__data__/store';
import { DiscountCreationBlockContainerS } from '../../styles/place-form';
import { Adder } from '../adder';

export type TDiscountData = {
  amount: number;
  type: string;
  information: string;
  conditions: string[];
};

type DiscountCreationBlockProps = {
  isEditing?: boolean;
};

export const DiscountCreationBlock: FunctionComponent<DiscountCreationBlockProps> = ({
  isEditing
}): JSX.Element => {
  const { newPlaceSlice: newPlaceState, editPlaceSlice: editPlaceState } = useSelector(
    (state: RootState) => state
  );
  const { data: discountTypes } = useGetDiscountTypesQuery();
  const [addetingError, setAddetingError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handlerAmountChange = (value: Pick<TDiscountData, 'amount'>): void => {
    dispatch(
      isEditing ? setEditPlaceDiscountAmount(value.amount) : setNewPlaceDiscountAmount(value.amount)
    );
  };

  const handlerTypeChange = (value: Pick<TDiscountData, 'type'>): void => {
    dispatch(
      isEditing
        ? setEditPlaceDiscountDiscountTypeId(value.type)
        : setNewPlaceDiscountDiscountTypeId(value.type)
    );
  };

  const handlerInformationChange = (value: Pick<TDiscountData, 'information'>): void => {
    dispatch(
      isEditing
        ? setEditPlaceDiscountInformation(value.information)
        : setNewPlaceDiscountInformation(value.information)
    );
  };

  const handlerConditionsChange = (value: string): void => {
    const clearValue = value.trimStart().trimEnd();
    if (clearValue.length < 1) {
      setAddetingError(true);
      return;
    }
    dispatch(
      isEditing
        ? setEditPlaceDiscountConditions([...editPlaceState.discount.conditions, clearValue])
        : setNewPlaceDiscountConditions([...newPlaceState.discount.conditions, clearValue])
    );
  };

  const handlerConditionsDelete = (value: string): void => {
    dispatch(
      isEditing
        ? setEditPlaceDiscountConditions(
            editPlaceState.discount.conditions.filter(item => item !== value)
          )
        : setNewPlaceDiscountConditions(
            newPlaceState.discount.conditions.filter(item => item !== value)
          )
    );
  };

  const getDiscountAmount = (discountState: TNewDiscount): number | null => {
    return discountState.amount !== 0 ? discountState.amount : null;
  };

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
            handlerAmountChange({ amount: Number(e.target.value) });
          }}
          value={
            isEditing
              ? getDiscountAmount(editPlaceState.discount)
              : getDiscountAmount(newPlaceState.discount)
          }
          placeholder='Размер'
        />
        <FormControl fullWidth size='small'>
          <InputLabel id='disType'>Тип скидки</InputLabel>
          <Select
            labelId='disType'
            label='Тип скидки'
            placeholder={'Тип скидки'}
            value={
              isEditing
                ? editPlaceState.discount.discountTypeId
                : newPlaceState.discount.discountTypeId
            }
            onChange={e => handlerTypeChange({ type: e.target.value as string })}
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
        onAdding={handlerConditionsChange}
        addedElements={
          isEditing ? editPlaceState.discount.conditions : newPlaceState.discount.conditions
        }
        helperText='пример: "Предъявить карту "Сберпорт""'
        error={addetingError}
        onDeleteItem={handlerConditionsDelete}
      />
      <TextField
        label='Дополнительная информация'
        placeholder='Дополнительная информация'
        multiline
        maxRows={6}
        minRows={4}
        value={isEditing ? editPlaceState.discount.information : newPlaceState.discount.information}
        onChange={e => handlerInformationChange({ information: e.target.value as string })}
      />
    </DiscountCreationBlockContainerS>
  );
};
