import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdderContainerS, AdderLabelS, ListS } from '../../styles/adder';
import { InputS } from '../../styles/input';
import { Button } from '../button';
import WhitePlusIcon from '/public/icons/white-plus-icon.svg?react';
import { useDispatch } from 'react-redux';
import { setDiscountConditions } from '../../__data__/slices/new-place';

type AdderProps = {
  label: string;
  placeholder: string;
  isCondition?: boolean;
  isAddress?: boolean;
  onAddressAdder: (addsess: string) => void;
};

type TAdderData = {
  label: string;
};

export const Adder: FunctionComponent<AdderProps> = ({
  label,
  placeholder,
  isCondition = false,
  isAddress = false,
  onAddressAdder
}): JSX.Element => {
  const {
    register,
    getValues,
    reset,
    formState: { errors }
  } = useForm<TAdderData>();
  const [list, setList] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handlerAdd = (): void => {
    if (getValues('label').length <= 0) return;
    setList([...list, getValues('label')]);
    if (isCondition) {
      dispatch(setDiscountConditions([...list, getValues('label').trimStart().trimEnd()]));
      reset({ label: '' });
      return;
    }
    if (isAddress) {
      onAddressAdder(getValues('label').trimStart().trimEnd());
      reset({ label: '' });
      return;
    }
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
        />
        <Button icon={WhitePlusIcon} iconSize={20} backgroundColor='blue' onClick={handlerAdd} />
      </div>
      <ListS isAddress={isAddress}>
        {list.map(item => (
          <div>{item}</div>
        ))}
      </ListS>
    </AdderContainerS>
  );
};
