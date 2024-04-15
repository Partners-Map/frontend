import styled from 'styled-components';

export const InputS = styled.input<{ error?: boolean; maxWidth?: string }>`
  display: flex;
  width: 100%;
  height: 2vh;
  max-height: 40px;
  min-height: 12px;
  max-width: ${({ maxWidth }): string => (maxWidth ? maxWidth : '400px')};
  padding: 1vh;
  outline: none;
  border: 1px solid ${({ error }): string => (error ? '#e62a2a' : '#CCCCCC')};
  border-radius: 6px;

  &::placeholder {
    font-size: 14px;
    color: #cccccc;
  }

  &:focus {
    outline: none;
  }
`;
