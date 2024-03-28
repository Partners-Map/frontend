import { FunctionComponent } from 'react';
import { ButtonS } from '../../styles/button';

type ButtonProps = {
  title: string;
  onClick?: () => void;
};

export const Button: FunctionComponent<ButtonProps> = ({ title, onClick }): JSX.Element => {
  return <ButtonS onClick={onClick}>{title}</ButtonS>;
};
