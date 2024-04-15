import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { InputS } from '../../styles/input';
import {
  DescriptionTextareaS,
  FieldContainerS,
  FieldLabelS,
  InputWrapperS,
  PlaceFormContainerS
} from '../../styles/place-form';
import { DiscountForm } from '../discount-form';
import { Select, SelectOption } from '../select';
import { WorkingHours } from '../working-hours';

export type TPlaceData = {
  title: string;
  category: string;
  workingHours: {
    from: string;
    to: string;
  };
  description: string;
};

export const PlaceForm: FunctionComponent = (): JSX.Element => {
  const [transformedArray, setTransformedArray] = useState<SelectOption[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<TPlaceData>();
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

  useEffect(() => {
    console.log(watch());
  }, [watch()]);

  return (
    <PlaceFormContainerS>
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
        <WorkingHours
          register={register}
          errorStatus={Boolean(errors.workingHours?.from && errors.workingHours?.to)}
        />
      </FieldContainerS>
      <FieldContainerS>
        <FieldLabelS>Средний чек</FieldLabelS>
        {/* <Select
          styleContainer={{
            maxWidth: 'none'
          }}
          options={[
            { value: '1', label: 'Средний чек 1' },
            { value: '2', label: 'Средний чек 2' }
          ]}
          placeholder={'Выберите'}
          selecteOption={}
        /> */}
      </FieldContainerS>
      <FieldContainerS>
        <FieldLabelS>Описание</FieldLabelS>
        <DescriptionTextareaS {...register('description')} placeholder='Описание' />
      </FieldContainerS>
      <DiscountForm />
    </PlaceFormContainerS>
  );
};
