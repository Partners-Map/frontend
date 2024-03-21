import { CSSProperties, ChangeEvent, FunctionComponent, HTMLInputTypeAttribute } from 'react';
import { LoginInputS } from '../../styles/login-form';

type TLoginInputProps = {
  type: HTMLInputTypeAttribute;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
};

export const LoginInput: FunctionComponent<TLoginInputProps> = ({ type, name, value, onChange, style }) => (
  <LoginInputS
    type={type}
    name={name}
    style={{
      ...style
    }}
    value={value}
    onChange={onChange}
  />
);
