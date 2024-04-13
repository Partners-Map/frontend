import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { InputS } from '../../styles/input';

type WorkingHoursProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errorStatus: boolean;
};

export const WorkingHours = <T extends FieldValues>({
  register,
  errorStatus
}: WorkingHoursProps<T>): JSX.Element => {
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
        type='number'
        {...register('workingHours.from' as Path<T>)}
        placeholder='От'
        maxWidth='194px'
        error={Boolean(errorStatus)}
      />
      <InputS
        type='number'
        {...register('workingHours.to' as Path<T>)}
        placeholder='До'
        maxWidth='194px'
        error={Boolean(errorStatus)}
      />
    </div>
  );
};
