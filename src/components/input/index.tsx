import { CSSProperties, FunctionComponent, HTMLInputTypeAttribute, useState } from 'react';
import { InputS } from '../../styles/input';
import { FieldLabelS, InputWrapperS } from '../../styles/place-form';

type InputProps = {
  value: string | number;
  type: HTMLInputTypeAttribute;
  title: string;
  placeholder?: string;
  style?: CSSProperties;
  onChange: (value: string) => void;
};

export const Input: FunctionComponent<InputProps> = ({
  value,
  type,
  title,
  placeholder = title,
  style,
  onChange
}): JSX.Element => {
  return (
    <div style={style}>
      <FieldLabelS>{title}</FieldLabelS>
      <InputWrapperS>
        <InputS
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </InputWrapperS>
    </div>
  );
};
