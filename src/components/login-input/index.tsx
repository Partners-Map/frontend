import { CSSProperties, FunctionComponent, HTMLInputTypeAttribute } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { LoginInputS } from '../../styles/login-form';

type TLoginInputProps<T extends FieldValues> = {
  type: HTMLInputTypeAttribute;
  name: keyof T;
  placeholder: string;
  register: UseFormRegister<T>;
  style?: CSSProperties;
};

export const LoginInput: FunctionComponent<TLoginInputProps<any>> = ({
  type,
  name,
  placeholder,
  register,
  style
}): JSX.Element => (
  <LoginInputS
    type={type}
    {...register(name as string, { required: true })}
    style={{
      ...style
    }}
    placeholder={placeholder}
  />
);
