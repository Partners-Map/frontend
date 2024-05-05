import { UnknownAction } from '@reduxjs/toolkit/react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import {
  NewPlaceState,
  setPlaceCategoryId,
  setPlaceDescription,
  setPlaceTitle
} from '../../__data__/slices/new-place';
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

export type TPlaceCreationBlock = {
  title: string;
  category: string;
  description: string;
};

export const PlaceCreationBlock: FunctionComponent = (): JSX.Element => {
  const [transformedArray, setTransformedArray] = useState<SelectOption[]>([]);
  const currentPlace = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice
  );
  const { register, watch, setValue, getValues } = useForm<TPlaceCreationBlock>({
    defaultValues: {
      title: currentPlace.place.title,
      category: currentPlace.categoryId,
      description: currentPlace.place.description
    }
  });
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
        <InputWrapperS>
          <Select
            styleContainer={{
              maxWidth: 'none',
              width: '80vw'
            }}
            options={transformedArray}
            placeholder={'Выберите'}
            onChange={handlerSelectCategory}
          />
        </InputWrapperS>
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
