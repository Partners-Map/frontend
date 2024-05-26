import { FormControl, TextField } from '@mui/material';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPlaceClosingTime as setEditPlaceClosingTime,
  setPlaceOpeningTime as setEditPlaceOpeningTime
} from '../../__data__/slices/edit-place';
import {
  setPlaceClosingTime as setNewPlaceClosingTime,
  setPlaceOpeningTime as setNewPlaceOpeningTime
} from '../../__data__/slices/new-place';
import { RootState } from '../../__data__/store';

type TWorkingHoursData = {
  from: string;
  to: string;
};

type WorkingHoursProps = {
  isEditing?: boolean;
};

export const WorkingHours: FunctionComponent<WorkingHoursProps> = ({
  isEditing = false
}): JSX.Element => {
  const { newPlaceSlice: newPlaceState, editPlaceSlice: editPlaceState } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();

  const handlerOpeningTimeChange = (value: Pick<TWorkingHoursData, 'from'>): void => {
    dispatch(isEditing ? setEditPlaceOpeningTime(value.from) : setNewPlaceOpeningTime(value.from));
  };

  const handlerClosingTimeChange = (value: Pick<TWorkingHoursData, 'to'>): void => {
    dispatch(isEditing ? setEditPlaceClosingTime(value.to) : setNewPlaceClosingTime(value.to));
  };

  return (
    <FormControl
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: '6px'
      }}
      size='small'
    >
      <TextField
        type='text'
        onChange={e => {
          handlerOpeningTimeChange({ from: e.target.value as string });
        }}
        value={isEditing ? editPlaceState.place.openingTime : newPlaceState.place.openingTime}
        placeholder='C'
        fullWidth
        size='small'
        label='C'
        helperText='в формате 00:00'
      />
      <TextField
        type='text'
        onChange={e => {
          handlerClosingTimeChange({ to: e.target.value as string });
        }}
        value={isEditing ? editPlaceState.place.closingTime : newPlaceState.place.closingTime}
        placeholder='До'
        fullWidth
        size='small'
        label='До'
        helperText='в формате 00:00'
      />
    </FormControl>
  );
};
