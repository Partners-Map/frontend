import { FunctionComponent, useState } from 'react';
import { FieldContainerS } from '../../styles/place-form';
import { TextareaLabelS, TextareaS } from '../../styles/textarea';

type TextareaProps = {
  title: string;
  placeholder?: string;
};

export const Textarea: FunctionComponent<TextareaProps> = ({
  title,
  placeholder = title
}): JSX.Element => {
  const [textareaData, setTextareaData] = useState<string>('');
  return (
    <FieldContainerS>
      <TextareaLabelS>{title}</TextareaLabelS>
      <TextareaS
        placeholder={placeholder}
        value={textareaData}
        onChange={e => setTextareaData(e.target.value)}
      />
    </FieldContainerS>
  );
};
