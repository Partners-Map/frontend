import { CSSProperties, FunctionComponent, useState } from 'react';
import { SelectContainerS, SelectOptionS, SelectOptionsS, SelectValue } from '../../styles/select';
import SelectLineIcon from '/public/icons/select-line.svg?react';
import { UseFormSetValue } from 'react-hook-form';
import { TDiscountData } from '../discount-form';

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectProps = {
  options: SelectOption[];
  styleContainer?: CSSProperties;
  placeholder: string;
  selecteOption: UseFormSetValue<any>;
  fieldName: string;
};

export const Select: FunctionComponent<SelectProps> = ({
  options,
  styleContainer,
  placeholder,
  selecteOption,
  fieldName
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption>();

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  const onOptionClick = (option: SelectOption): void => {
    setSelectedOption(option);
    selecteOption(fieldName, option.value);
    setIsOpen(false);
  };

  return (
    <SelectContainerS onClick={toggleOpen} style={styleContainer}>
      {selectedOption ? (
        <SelectValue>{selectedOption.label}</SelectValue>
      ) : (
        <SelectValue placeholder>{placeholder}</SelectValue>
      )}
      <SelectLineIcon height='15' width='15' />
      <SelectOptionsS isOpen={isOpen}>
        {options.map((option, index) => (
          <SelectOptionS key={index} onClick={() => onOptionClick(option)}>
            {option.label}
          </SelectOptionS>
        ))}
      </SelectOptionsS>
    </SelectContainerS>
  );
};
