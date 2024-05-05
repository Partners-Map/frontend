import { CSSProperties, FunctionComponent, HTMLInputTypeAttribute, useState } from 'react';
import { InputS } from '../../styles/input';
import { FieldLabelS, InputWrapperS } from '../../styles/place-form';

type InputProps = {
  type: HTMLInputTypeAttribute;
  title: string;
  placeholder?: string;
  style?: CSSProperties;
  onChange: (value: string) => void;
};

export const Input: FunctionComponent<InputProps> = ({
  type,
  title,
  placeholder = title,
  style,
  onChange
}): JSX.Element => {
  const [inputValue, setInputValue] = useState<number | string>();

  return (
    <div style={style}>
      <FieldLabelS>{title}</FieldLabelS>
      <InputWrapperS>
        <InputS
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={e => onChange(e.target.value)}
        />
      </InputWrapperS>
    </div>
  );
};
