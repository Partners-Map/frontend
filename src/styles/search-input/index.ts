import styled from 'styled-components';

export const SearchInputS = styled.input`
  margin: 2vh 0 0 0;
  padding: 1vh 4vw 1vh 4vw;
  border: 1px solid #cccccc;
  border-radius: 4px;

  &::placeholder {
    font-size: 12px;
    color: #cccccc;
  }

  &:focus {
    outline: none;
  }
`;
