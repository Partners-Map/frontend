import { CSSProperties, HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { LoginInputS } from '../../styles/login-form';

type TLoginInputProps<T extends FieldValues> = {
  type: HTMLInputTypeAttribute;
  name: keyof T;
  placeholder: string;
  register: UseFormRegister<T>;
  style?: CSSProperties;
  errorStatus: boolean;
};

export const LoginInput = <T extends FieldValues>({
  type,
  name,
  placeholder,
  register,
  style,
  errorStatus
}: TLoginInputProps<T>): JSX.Element => (
  <LoginInputS
    type={type}
    {...register(name as Path<T>, { required: true })}
    style={style}
    placeholder={placeholder}
    error={Boolean(errorStatus)}
  />
);
