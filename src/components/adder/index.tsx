import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdderContainerS, AdderLabelS } from '../../styles/adder';
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
    getValues,
    reset,
    formState: { errors }
  } = useForm<TAdderData>();
  const [conditions, setConditions] = useState<string[]>([]);

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
        <Button
          icon={WhitePlusIcon}
          iconSize={20}
          backgroundColor='blue'
          onClick={() => {
            setConditions([...conditions, getValues('label')]);
            reset({ label: '' });
          }}
        />
      </div>
      {conditions.map(condition => (
        <div>{condition}</div>
      ))}
    </AdderContainerS>
  );
};
