import styled from 'styled-components';

export const PlaceFormContainerS = styled.div`
  margin: 2vh 0 0 0;
  display: flex;
  flex-direction: column;
`;

export const FieldContainerS = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

export const FieldLabelS = styled.div`
  font-size: 14px;
  color: #010736dd;
  font-family: Ubuntu;
  font-size: 12px;
  font-weight: 400;
  line-height: 13.79px;
  text-align: left;
`;

export const InputWrapperS = styled.div`
  display: flex;
`;

export const DescriptionTextareaS = styled.textarea`
  max-width: 400px;
  resize: vertical;
  min-height: 14vh;
  border: 1px solid #cccccc;
  border-radius: 6px;
  padding: 1vh;

  &::placeholder {
    font-size: 10px;
    color: #cccccc;
  }

  &:focus {
    outline: none;
  }
`;
