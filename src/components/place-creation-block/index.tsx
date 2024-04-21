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
import { Select, SelectOption } from '../select';
import { WorkingHours } from '../working-hours';
import { Textarea } from '../textarea';

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

  useEffect(() => {
    if (categories) {
      const newTransformedArray = categories.map(discountType => ({
        value: discountType.id,
        label: discountType.title
      }));
      setTransformedArray(newTransformedArray);
    }
  }, [categories]);

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
          selecteOption={setValue}
          fieldName={'category'}
        />
      </FieldContainerS>
      <FieldContainerS>
        <FieldLabelS>Название завидения</FieldLabelS>
        <WorkingHours />
      </FieldContainerS>
      <FieldContainerS>
        <FieldLabelS>Средний чек</FieldLabelS>
        <Select
          styleContainer={{
            maxWidth: 'none'
          }}
          options={[
            { value: '1', label: 'Средний чек 1' },
            { value: '2', label: 'Средний чек 2' }
          ]}
          placeholder={'Выберите'}
          // selecteOption={}
        />
      </FieldContainerS>
      <Textarea title='Описание' />
    </PlaceCreationBlockContainerS>
  );
};
