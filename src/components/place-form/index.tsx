import { FunctionComponent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { InputS } from '../../styles/input';
import { Select } from '../select';
import { WorkingHours } from '../working-hours';
import {
  DescriptionTextareaS,
  FieldContainerS,
  FieldLabelS,
  InputWrapperS,
  PlaceFormContainerS
} from '../../styles/place-form';
import { DiscountForm } from '../discount-form';

type TPlaceData = {
  title: string;
  category: string;
  workingHours: {
    from: string;
    to: string;
  };
  description: string;
};

export const PlaceForm: FunctionComponent = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TPlaceData>();

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
          options={[
            { value: '1', label: 'Категория 1' },
            { value: '2', label: 'Категория 2' }
          ]}
          placeholder={'Выберите'}
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
        <Select
          styleContainer={{
            maxWidth: 'none'
          }}
          options={[
            { value: '1', label: 'Средний чек 1' },
            { value: '2', label: 'Средний чек 2' }
          ]}
          placeholder={'Выберите'}
        />
      </FieldContainerS>
      <FieldContainerS>
        <FieldLabelS>Описание</FieldLabelS>
        <DescriptionTextareaS {...register('description')} placeholder='Описание' />
      </FieldContainerS>
      <DiscountForm />
    </PlaceFormContainerS>
  );
};
