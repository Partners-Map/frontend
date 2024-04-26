import { FunctionComponent, useState } from 'react';
import { FieldContainerS } from '../../styles/place-form';
import { TextareaLabelS, TextareaS } from '../../styles/textarea';

type TextareaProps = {
  title: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const Textarea: FunctionComponent<TextareaProps> = ({
  title,
  placeholder = title,
  onChange
}): JSX.Element => {
  const [textareaData, setTextareaData] = useState<string>('');
  const handlerChangeTextArea = (value: string): void => {
    onChange(value);
    setTextareaData(value);
  };

  return (
    <FieldContainerS>
      <TextareaLabelS>{title}</TextareaLabelS>
      <TextareaS
        placeholder={placeholder}
        value={textareaData}
        onChange={e => handlerChangeTextArea(e.target.value)}
      />
    </FieldContainerS>
  );
};
