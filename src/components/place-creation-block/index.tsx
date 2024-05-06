import { UnknownAction } from '@reduxjs/toolkit/react';
import { FunctionComponent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import {
  NewPlaceState,
  setPlaceCategoryId as setNewPlaceCategoryId,
  setPlaceDescription as setNewPlaceDescription,
  setPlaceTitle as setNewPlaceTitle
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
import { Input } from '../input';
import {
  EditPlaceState,
  setPlaceTitle as setEditPlaceTitle,
  setPlaceCategoryId as setEditPlaceCategoryId,
  setPlaceDescription as setEditPlaceDescription
} from '../../__data__/slices/edit-place';
import { useParams } from 'react-router-dom';
import { useGetPlaceByIdWithFullInfoQuery } from '../../__data__/services/place';

type PlaceCreationBlockProps = {
  isEditing?: boolean;
};

export type TPlaceCreationBlock = {
  title: string;
  category: string;
  description: string;
};

export const PlaceCreationBlock: FunctionComponent<PlaceCreationBlockProps> = ({
  isEditing = false
}): JSX.Element => {
  const [transformedArray, setTransformedArray] = useState<SelectOption[]>([]);
  const { id, step: currentStep } = useParams();
  const { data } = useGetPlaceByIdWithFullInfoQuery(id!);
  const currentPlace = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice
  );
  const editPlace = useSelector(
    (state: { editPlaceSlice: EditPlaceState }) => state.editPlaceSlice
  );
  const { watch, setValue, getValues } = useForm<TPlaceCreationBlock>({
    defaultValues: {
      title: isEditing ? data?.title : currentPlace.place.title,
      category: currentPlace.categoryId,
      description: isEditing ? data?.description : currentPlace.place.description
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
    setValueToRedux('title', isEditing ? setEditPlaceTitle : setNewPlaceTitle);
    setValueToRedux('category', isEditing ? setEditPlaceCategoryId : setNewPlaceCategoryId);
    setValueToRedux('description', isEditing ? setEditPlaceDescription : setNewPlaceDescription);
  }, [watch()]);

  return (
    <PlaceCreationBlockContainerS>
      <FieldContainerS>
        <Input
          type='text'
          onChange={value => {
            setValue('title', value);
          }}
          value={getValues('title')}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
          placeholder='Название завидения'
          title={'Название завидения'}
        />
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
