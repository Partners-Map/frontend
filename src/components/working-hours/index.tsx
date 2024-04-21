import { FieldValues, Path, UseFormRegister, useForm } from 'react-hook-form';
import { InputS } from '../../styles/input';

type TWorkingHoursData = {
  from: string;
  to: string;
};

export const WorkingHours = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<TWorkingHoursData>();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: '5px'
      }}
    >
      <InputS
        type='time'
        {...register('from', {
          required: true
        })}
        placeholder='От'
        maxWidth='194px'
        error={Boolean(errors.from)}
      />
      <InputS
        type='text'
        {...register('to', {
          required: true
        })}
        placeholder='До'
        maxWidth='194px'
        error={Boolean(errors.to)}
      />
    </div>
  );
};
