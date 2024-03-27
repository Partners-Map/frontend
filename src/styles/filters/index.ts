import styled from 'styled-components';

export const FiltersSelectS = styled.select`
  padding: 1vh 4vw 1vh 4vw;
  margin: 0 1vw 0 0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: #fff;

  &:focus {
    outline: none;
  }

  option {
    width: 100%;
    padding: 1vh 4vw 1vh 4vw;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
  }
`;
