import styled from 'styled-components';

export const SelectContainer = styled.div`
  /* width: 40vw; */
  min-width: 60px;
  max-width: 150px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const SelectOptions = styled.div<{ isOpen: boolean }>`
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
  transition:
    opacity 0.1ms ease-in-out,
    transform 0.4s ease-in-out;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;

export const SelectOption = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
