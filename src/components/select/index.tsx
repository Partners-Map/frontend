import { FunctionComponent, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
      opacity: 0;
      transform: translateY(-10px);
  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
`;

const CustomSelectContainer = styled.div`
  position: relative;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CustomSelectOptions = styled.div<{ isOpen: boolean }>`
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  left: 0;
  top: 42px;
  z-index: 1;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;

const CustomSelectOption = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  options: Option[];
};

export const Select: FunctionComponent<CustomSelectProps> = ({ options }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option>();

  const toggleOpen = (): void => setIsOpen(!isOpen);

  const onOptionClick = (option: Option): void => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <>
      <CustomSelectContainer onClick={toggleOpen}>
        {selectedOption ? selectedOption.label : 'Выберите опцию'}
        <CustomSelectOptions isOpen={isOpen}>
          {options.map((option, index) => (
            <CustomSelectOption key={index} onClick={() => onOptionClick(option)}>
              {option.label}
            </CustomSelectOption>
          ))}
        </CustomSelectOptions>
      </CustomSelectContainer>
    </>
  );
};
