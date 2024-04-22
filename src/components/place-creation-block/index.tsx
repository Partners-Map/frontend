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

export type TPlaceCreationBlock = {
  title: string;
  category: string;
  description: string;
};

export const PlaceCreationBlock: FunctionComponent = (): JSX.Element => {
  const [transformedArray, setTransformedArray] = useState<SelectOption[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<TPlaceCreationBlock>();
  const { data: categories } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const handlerSelectCategory = (option: SelectOption): void => {
    setValue('category', option.value);
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
    dispatch()
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
      <Textarea title='Описание' />
    </PlaceCreationBlockContainerS>
  );
};
