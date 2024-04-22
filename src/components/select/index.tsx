import { CSSProperties, FunctionComponent, useEffect, useState } from 'react';
import { SelectContainerS, SelectOptionS, SelectOptionsS, SelectValue } from '../../styles/select';
import SelectLineIcon from '/public/icons/select-line.svg?react';

export type SelectOption = {
  value: string;
  label: string;
  ariaLabel?: string;
};

export type SelectProps = {
  options: SelectOption[];
  styleContainer?: CSSProperties;
  placeholder: string;
  onChange: (value: SelectOption) => void;
  disabled?: boolean;
};

export const Select: FunctionComponent<SelectProps> = ({
  options,
  styleContainer,
  placeholder,
  onChange,
  disabled = false
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption>();

  const toggleOpen = (): void => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const onOptionClick = (option: SelectOption): void => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }

    setIsOpen(false);
  };

  useEffect(() => {
    if (disabled) {
      const initState = {
        value: '',
        label: '',
        ariaLabel: ''
      };
      setSelectedOption(initState);
      onChange(initState);
    }
  }, [disabled]);

  return (
    <SelectContainerS disabled={disabled} onClick={toggleOpen} style={styleContainer}>
      {selectedOption ? (
        <SelectValue>{selectedOption.label}</SelectValue>
      ) : (
        <SelectValue placeholder>{placeholder}</SelectValue>
      )}
      <SelectLineIcon height='15' width='15' />
      <SelectOptionsS isOpen={isOpen}>
        {options.map((option, index) => (
          <SelectOptionS
            key={index}
            onClick={() => onOptionClick(option)}
            aria-label={option.ariaLabel ? option.ariaLabel : option.label}
          >
            {option.label}
          </SelectOptionS>
        ))}
      </SelectOptionsS>
    </SelectContainerS>
  );
};
