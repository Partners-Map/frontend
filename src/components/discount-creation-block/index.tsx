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

export type TDiscountData = {
  size: number;
  type: string;
};

export const DiscountCreationBlock: FunctionComponent = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<TDiscountData>();
  const { data: discountTypes } = useGetDiscountTypesQuery();
  const [transformedArray, setTransformedArray] = useState<SelectOption[]>([]);

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
              {...register('size', { required: true })}
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
              selecteOption={setValue}
              fieldName='type'
            />
          </InputWrapperS>
        </FieldContainerS>
      </DiscountInfoContainerS>
      <Adder label={'Условие'} placeholder={'Условие'} />
      <Textarea title='Дополнительная информация' />
    </DiscountCreationBlockContainerS>
  );
};
