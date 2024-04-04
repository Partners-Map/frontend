import { FunctionComponent, useState } from 'react';
import { SelectContainer, SelectOption, SelectOptions } from '../../styles/select';
import SelectLine from '/public/icons/select-line.svg?react';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
};

export const Select: FunctionComponent<SelectProps> = ({ options }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>();

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  const onOptionClick = (option: Option): void => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <SelectContainer onClick={toggleOpen}>
      {selectedOption ? selectedOption.label : options[0].label}
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
