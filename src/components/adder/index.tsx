import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdderLabelS } from '../../styles/adder';
import { InputS } from '../../styles/input';
import { Button } from '../button';
import WhitePlusIcon from '/public/icons/white-plus-icon.svg?react';

type AdderProps = {
  label: string;
  placeholder: string;
};

type TAdderData = {
  label: string;
};

export const Adder: FunctionComponent<AdderProps> = ({ label, placeholder }): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<TAdderData>();
  const [conditions, setConditions] = useState<string[]>([]);
  const labelValue = watch('label');

  return (
    <div
      style={{
        margin: '2vh 0 0 0'
      }}
    >
      <AdderLabelS>{label}</AdderLabelS>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '6px'
        }}
      >
        <InputS type='text' {...register('label', { required: true })} placeholder={placeholder} />
        <Button
          icon={WhitePlusIcon}
          iconSize={20}
          backgroundColor='blue'
          onClick={() => {
            setConditions([...conditions, labelValue]);
            reset({ label: '' });
          }}
        />
      </div>
      {conditions.map(condition => (
        <p>{condition}</p>
      ))}
    </div>
  );
};
