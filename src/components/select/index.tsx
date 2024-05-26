import { CSSProperties, FunctionComponent, useEffect, useRef, useState } from 'react';
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
  defaultValue?: SelectOption;
};

export const Select: FunctionComponent<SelectProps> = ({
  options,
  styleContainer,
  placeholder,
  onChange,
  disabled = false,
  defaultValue = options[0]
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption>(defaultValue);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
    }
  }, []);

  const containerStyle: CSSProperties = {
    ...styleContainer,
    minWidth: containerWidth ? `${containerWidth}px` : 'auto'
  };

  return (
    <SelectContainerS
      ref={containerRef}
      disabled={disabled}
      onClick={toggleOpen}
      style={containerStyle}
    >
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
