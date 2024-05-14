import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAvgPricesQuery } from '../../__data__/services/avg-price';
import {
  setPlaceMaxAvgPriceId as setEditPlaceMaxAvgPriceId,
  setPlaceMinAvgPriceId as setEditPlaceMinAvgPriceId
} from '../../__data__/slices/edit-place';
import {
  setPlaceMaxAvgPriceId as setNewPlaceMaxAvgPriceId,
  setPlaceMinAvgPriceId as setNewPlaceMinAvgPriceId
} from '../../__data__/slices/new-place';
import { RootState } from '../../__data__/store';

type PickAvgPriceProps = {
  isEditing?: boolean;
};

type TPickAvgPriceData = {
  minAvgPriceId: string;
  maxAvgPriceId?: string;
};

export const PickAvgPrice: FunctionComponent<PickAvgPriceProps> = ({ isEditing }): JSX.Element => {
  const { data: avgPrices } = useGetAvgPricesQuery();
  const { newPlaceSlice: newPlaceState, editPlaceSlice: editPlaceState } = useSelector(
    (state: RootState) => state
  );
  const [disabledRangeAvgPrice, setDisabledRangeAvgPrice] = useState<boolean>(
    isEditing ? !!editPlaceState.place.maxAvgPriceId : !!newPlaceState.place.maxAvgPriceId
  );
  const dispatch = useDispatch();

  const onSetMinAvgPriceId = (value: Pick<TPickAvgPriceData, 'minAvgPriceId'>): void => {
    dispatch(
      isEditing
        ? setEditPlaceMinAvgPriceId(value.minAvgPriceId)
        : setNewPlaceMinAvgPriceId(value.minAvgPriceId)
    );
  };

  const onSetMaxAvgPriceId = (value: Pick<TPickAvgPriceData, 'maxAvgPriceId'>): void => {
    dispatch(
      isEditing
        ? setEditPlaceMaxAvgPriceId(value.maxAvgPriceId || '')
        : setNewPlaceMaxAvgPriceId(value.maxAvgPriceId || '')
    );
  };

  const handlerRangeSelector = (): void => {
    setDisabledRangeAvgPrice(!disabledRangeAvgPrice);
    dispatch(isEditing ? setEditPlaceMaxAvgPriceId('') : setNewPlaceMaxAvgPriceId(''));
  };

  return (
    <>
      <FormControl
        sx={{ minWidth: 120, display: 'flex', flexDirection: 'row', gap: '6px' }}
        size='small'
        fullWidth
      >
        <InputLabel id='avgPrice'>Средний чек</InputLabel>
        <Select
          labelId='avgPrice'
          label={'Средний чек'}
          fullWidth
          placeholder={'Выберите'}
          value={isEditing ? editPlaceState.place.minAvgPriceId : newPlaceState.place.minAvgPriceId}
          onChange={e => onSetMinAvgPriceId({ minAvgPriceId: e.target.value as string })}
        >
          {avgPrices?.map(avgPrice => <MenuItem value={avgPrice.id}>{avgPrice.symbol}</MenuItem>)}
        </Select>
        <FormControl disabled={!disabledRangeAvgPrice} fullWidth size='small'>
          <InputLabel id='avgPriceRange'>Средний чек</InputLabel>
          <Select
            labelId='avgPriceRange'
            label={'Средний чек'}
            fullWidth
            placeholder={'Выберите'}
            value={
              isEditing ? editPlaceState.place.maxAvgPriceId : newPlaceState.place.maxAvgPriceId
            }
            onChange={e => onSetMaxAvgPriceId({ maxAvgPriceId: e.target.value as string })}
          >
            {avgPrices?.map(avgPrice => <MenuItem value={avgPrice.id}>{avgPrice.symbol}</MenuItem>)}
          </Select>
        </FormControl>
      </FormControl>
      <FormControl>
        <FormControlLabel
          control={<Checkbox checked={disabledRangeAvgPrice} onChange={handlerRangeSelector} />}
          label='Выставить диапазон'
        />
      </FormControl>
    </>
  );
};
