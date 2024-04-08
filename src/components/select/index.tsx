import { CSSProperties, FunctionComponent, useState } from 'react';
import { SelectContainer, SelectOption, SelectOptions } from '../../styles/select';
import SelectLine from '/public/icons/select-line.svg?react';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: SelectOption[];
  styleContainer?: CSSProperties;
};

export const Select: FunctionComponent<SelectProps> = ({
  options,
  styleContainer
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption>();

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  const onOptionClick = (option: SelectOption): void => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <SelectContainer onClick={toggleOpen} style={styleContainer}>
      {selectedOption ? selectedOption.label : options[0]?.label}
      <SelectLine height='15' width='15' />
      <SelectOptions isOpen={isOpen}>
        {options.map((option, index) => (
          <SelectOption key={index} onClick={() => onOptionClick(option)}>
            {option.label}
          </SelectOption>
        ))}
      </SelectOptions>
    </SelectContainer>
  );
};
