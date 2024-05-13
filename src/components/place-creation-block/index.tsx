import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { UnknownAction } from '@reduxjs/toolkit/react';
import { FunctionComponent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { useGetPlaceByIdWithFullInfoQuery } from '../../__data__/services/place';
import {
  EditPlaceState,
  setPlaceCategoryId as setEditPlaceCategoryId,
  setPlaceDescription as setEditPlaceDescription,
  setPlaceTitle as setEditPlaceTitle
} from '../../__data__/slices/edit-place';
import {
  NewPlaceState,
  setPlaceCategoryId as setNewPlaceCategoryId,
  setPlaceDescription as setNewPlaceDescription,
  setPlaceTitle as setNewPlaceTitle
} from '../../__data__/slices/new-place';
import { FieldContainerS, PlaceCreationBlockContainerS } from '../../styles/place-form';
import { PickAvgPrice } from '../pick-avg-price';
import { WorkingHours } from '../working-hours';

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

  const handlerSelectCategory = (option: string): void => {
    setValue('category', option);
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
    setValueToRedux('title', isEditing ? setEditPlaceTitle : setNewPlaceTitle);
    setValueToRedux('category', isEditing ? setEditPlaceCategoryId : setNewPlaceCategoryId);
    setValueToRedux('description', isEditing ? setEditPlaceDescription : setNewPlaceDescription);
  }, [watch()]);

  return (
    <PlaceCreationBlockContainerS>
      <Typography variant='h4' color={'primary'}>
        Заведение
      </Typography>
      <TextField
        type='text'
        onChange={e => {
          setValue('title', e.target.value);
        }}
        value={getValues('title')}
        size='small'
        fullWidth
        placeholder='Название завидения'
        label={'Название завидения'}
      />
      <FormControl sx={{ minWidth: 120 }} size='small' fullWidth>
        <InputLabel id='categorySelect'>Категория</InputLabel>
        <Select
          labelId='categorySelect'
          label='Категория'
          value={getValues('category')}
          onChange={(e: SelectChangeEvent) => handlerSelectCategory(e.target.value as string)}
        >
          {categories?.map(data => <MenuItem value={data.id}>{data.title}</MenuItem>)}
        </Select>
      </FormControl>
      <FieldContainerS>
        <Typography variant='subtitle1' color={'primary'}>
          Время работы
        </Typography>
        <WorkingHours />
      </FieldContainerS>
      <FieldContainerS>
        <Typography variant='subtitle1' color={'primary'}>
          Средний чек
        </Typography>
        <PickAvgPrice />
      </FieldContainerS>
      <TextField
        label='Описание'
        placeholder='Описание'
        multiline
        maxRows={6}
        minRows={4}
        onChange={e => handlerChangeTextArea(e.target.value as string)}
      />
    </PlaceCreationBlockContainerS>
  );
};
