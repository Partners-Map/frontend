import { CSSProperties, FunctionComponent, HTMLInputTypeAttribute, useState } from 'react';
import { InputS } from '../../styles/input';
import { FieldLabelS, InputWrapperS } from '../../styles/place-form';

type InputProps = {
  type: HTMLInputTypeAttribute;
  title: string;
  placeholder?: string;
};

export const Input: FunctionComponent<InputProps> = ({
  type,
  title,
  placeholder = title
}): JSX.Element => {
  const [inputValue, setInputValue] = useState<number | string>();

  return (
    <>
      <FieldLabelS>{title}</FieldLabelS>
      <InputWrapperS>
        <InputS type={type} placeholder={placeholder} value={inputValue} />
      </InputWrapperS>
    </>
  );
};
