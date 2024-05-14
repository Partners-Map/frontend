import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { useGetPlaceByIdWithFullInfoQuery } from '../../__data__/services/place';
import {
  setPlaceCategoryId as setEditPlaceCategoryId,
  setPlaceDescription as setEditPlaceDescription,
  setPlaceTitle as setEditPlaceTitle
} from '../../__data__/slices/edit-place';
import {
  setPlaceCategoryId as setNewPlaceCategoryId,
  setPlaceDescription as setNewPlaceDescription,
  setPlaceTitle as setNewPlaceTitle
} from '../../__data__/slices/new-place';
import { RootState } from '../../__data__/store';
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
  const { newPlaceSlice: newPlaceState, editPlaceSlice: editPlaceState } = useSelector(
    (state: RootState) => state
  );
  const { data: categories } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  const handlerTitleChange = (value: Pick<TPlaceCreationBlock, 'title'>): void => {
    dispatch(isEditing ? setEditPlaceTitle(value.title) : setNewPlaceTitle(value.title));
  };

  const handlerCategoryIdChange = (value: Pick<TPlaceCreationBlock, 'category'>): void => {
    dispatch(
      isEditing ? setEditPlaceCategoryId(value.category) : setNewPlaceCategoryId(value.category)
    );
  };

  const handlerDescriptionChange = (value: Pick<TPlaceCreationBlock, 'description'>): void => {
    dispatch(
      isEditing
        ? setEditPlaceDescription(value.description)
        : setNewPlaceDescription(value.description)
    );
  };

  return (
    <PlaceCreationBlockContainerS>
      <Typography variant='h4' color={'primary'}>
        Заведение
      </Typography>
      <TextField
        type='text'
        onChange={e => {
          handlerTitleChange({ title: e.target.value as string });
        }}
        value={isEditing ? editPlaceState.place.title : newPlaceState.place.title}
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
          value={isEditing ? editPlaceState.categoryId : newPlaceState.categoryId}
          onChange={(e: SelectChangeEvent) =>
            handlerCategoryIdChange({ category: e.target.value as string })
          }
        >
          {categories?.map(data => <MenuItem value={data.id}>{data.title}</MenuItem>)}
        </Select>
      </FormControl>
      <FieldContainerS>
        <Typography variant='subtitle1' color={'primary'}>
          Время работы
        </Typography>
        <WorkingHours isEditing={isEditing} />
      </FieldContainerS>
      <FieldContainerS>
        <Typography variant='subtitle1' color={'primary'}>
          Средний чек
        </Typography>
        <PickAvgPrice isEditing={isEditing} />
      </FieldContainerS>
      <TextField
        label='Описание'
        placeholder='Описание'
        multiline
        maxRows={6}
        minRows={4}
        value={isEditing ? editPlaceState.place.description : newPlaceState.place.description}
        onChange={e => handlerDescriptionChange({ description: e.target.value as string })}
      />
    </PlaceCreationBlockContainerS>
  );
};
