import { CSSProperties, HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { InputS } from '../../styles/input';

type InputProps<T extends FieldValues> = {
  type: HTMLInputTypeAttribute;
  name: keyof T;
  placeholder: string;
  register: UseFormRegister<T>;
  style?: CSSProperties;
  errorStatus: boolean;
};

export const Input = <T extends FieldValues>({
  type,
  name,
  placeholder,
  register,
  style,
  errorStatus,
  
}: InputProps<T>): JSX.Element => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <label></label>
    <InputS
      type={type}
      {...register(name as Path<T>, { required: true })}
      style={style}
      placeholder={placeholder}
      error={Boolean(errorStatus)}
    />
  </div>
);
