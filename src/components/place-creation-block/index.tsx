import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { InputS } from '../../styles/input';
import {
  FieldContainerS,
  FieldLabelS,
  InputWrapperS,
  PlaceCreationBlockContainerS
} from '../../styles/place-form';
import { PickAvgPrice } from '../pick-avg-price';
import { Select, SelectOption } from '../select';
import { Textarea } from '../textarea';
import { WorkingHours } from '../working-hours';
import { useDispatch } from 'react-redux';
import {
  setPlaceCategoryId,
  setPlaceDescription,
  setPlaceTitle
} from '../../__data__/slices/new-place';
import { UnknownAction } from '@reduxjs/toolkit/react';

export type TPlaceCreationBlock = {
  title: string;
  category: string;
  description: string;
};

export const PlaceCreationBlock: FunctionComponent = (): JSX.Element => {
  const [transformedArray, setTransformedArray] = useState<SelectOption[]>([]);
  const { register, watch, setValue, getValues } = useForm<TPlaceCreationBlock>();
  const { data: categories } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const handlerSelectCategory = (option: SelectOption): void => {
    setValue('category', option.value);
  };

  const handlerChangeTextArea = (value: string): void => {
    setValue('description', value);
  };

  const setValueToRedux = (
    fieldName: keyof TPlaceCreationBlock,
    actionCreator: (data: string) => UnknownAction
  ): void => {
    const value = getValues(fieldName);
    if (value) {
      dispatch(actionCreator(value));
    }
  };

  useEffect(() => {
    if (categories) {
      const newTransformedArray = categories.map(discountType => ({
        value: discountType.id,
        label: discountType.title
      }));
      setTransformedArray(newTransformedArray);
    }
  }, [categories]);

  useEffect(() => {
    setValueToRedux('title', setPlaceTitle);
    setValueToRedux('category', setPlaceCategoryId);
    setValueToRedux('description', setPlaceDescription);
  }, [watch()]);

  return (
    <PlaceCreationBlockContainerS>
      <FieldContainerS>
        <FieldLabelS>Название завидения</FieldLabelS>
        <InputWrapperS>
          <InputS
            type='text'
            {...register('title', { required: true })}
            placeholder='Название завидения'
          />
        </InputWrapperS>
      </FieldContainerS>
      <FieldContainerS>
        <FieldLabelS>Категория</FieldLabelS>
        <Select
          styleContainer={{
            maxWidth: 'none'
          }}
          options={transformedArray}
          placeholder={'Выберите'}
          onChange={handlerSelectCategory}
        />
      </FieldContainerS>
      <FieldContainerS>
        <FieldLabelS>Время работы</FieldLabelS>
        <WorkingHours />
      </FieldContainerS>
      <FieldContainerS>
        <PickAvgPrice />
      </FieldContainerS>
      <Textarea title='Описание' onChange={handlerChangeTextArea} />
    </PlaceCreationBlockContainerS>
  );
};