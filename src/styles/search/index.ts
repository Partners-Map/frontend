import styled from 'styled-components';

export const SearchContainerS = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #cccccc;
  border-radius: 4px;
  justify-content: flex-end;
  height: 32px;
  width: 40vw;
`;

export const SearchInputS = styled.input`
  width: 100%;
  border: none;
  border-right: 1px solid #cccccc;
  border-radius: 4px 0px 0px 4px;
  padding-left: 8px;
  padding-right: 4px;

  &::placeholder {
    font-size: 10px;
  }

  &:focus {
    outline: none;
  }
`;

export const SearchButtonS = styled.button`
  border: none;
  border-radius: 0px 4px 4px 0px;
  padding: 1vh;
`;
