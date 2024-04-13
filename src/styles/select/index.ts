import styled from 'styled-components';

export const SelectContainerS = styled.div`
  min-width: 60px;
  max-width: 150px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const SelectOptionsS = styled.div<{ isOpen: boolean }>`
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  left: 0;
  top: 46px;
  z-index: 1;
  opacity: ${({ isOpen }): number => (isOpen ? 1 : 0)};
  transform: ${({ isOpen }): string => (isOpen ? 'translateY(0)' : 'translateY(-10px)')};
  transition:
    opacity 0.1ms ease-in-out,
    transform 0.4s ease-in-out;
  visibility: ${({ isOpen }): string => (isOpen ? 'visible' : 'hidden')};
`;

export const SelectOptionS = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const SelectValue = styled.label<{ placeholder?: boolean }>`
  font-size: 14px;
  color: ${({ placeholder }): string => (placeholder ? '#CCCCCC' : '#000')};
`;
