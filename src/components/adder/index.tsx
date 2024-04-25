import { CSSProperties, FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NewPlaceState } from '../../__data__/slices/new-place';
import {
  AddedItemTitleS,
  AdderContainerS,
  AdderHelperTextS,
  AdderLabelS,
  ListS
} from '../../styles/adder';
import { InputS } from '../../styles/input';
import { Button } from '../button';
import TrashIcon from '/public/icons/trash.svg?react';
import WhitePlusIcon from '/public/icons/white-plus-icon.svg?react';

type AdderProps = {
  label: string;
  placeholder?: string;
  onAdding: (value: string) => void;
  onDeleteItem: (value: string) => void;
  addedElements: TAdderData[];
  listStyle?: CSSProperties;
  error?: boolean;
  helperText?: string;
};

export type TAdderData = {
  label: string;
};

export const Adder: FunctionComponent<AdderProps> = ({
  label,
  placeholder = ' ',
  onAdding,
  addedElements = [],
  listStyle,
  error,
  helperText,
  onDeleteItem
}): JSX.Element => {
  const {
    register,
    getValues,
    reset,
    formState: { errors }
  } = useForm<TAdderData>();
  const dispatch = useDispatch();
  const addresses = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice.addresses
  );

  const handlerAdd = (): void => {
    if (errors.label) return;
    onAdding(getValues('label').trimStart().trimEnd());
    reset({ label: '' });
  };

  return (
    <AdderContainerS>
      <AdderLabelS>{label}</AdderLabelS>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '6px'
        }}
      >
        <InputS
          type='text'
          {...register('label', {
            required: true
          })}
          placeholder={placeholder}
          error={error}
        />

        <Button icon={WhitePlusIcon} iconSize={20} backgroundColor='blue' onClick={handlerAdd} />
      </div>
      <AdderHelperTextS>{helperText}</AdderHelperTextS>
      <ListS style={listStyle}>
        {addedElements.map(item => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '10px'
            }}
          >
            <AddedItemTitleS>{item.label}</AddedItemTitleS>
            <TrashIcon width={24} height={24} onClick={() => onDeleteItem(item.label)} />
          </div>
        ))}
      </ListS>
    </AdderContainerS>
  );
};
