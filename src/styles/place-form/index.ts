import styled from 'styled-components';
import { UbuntuRegular } from '../fonts';

export const PlaceFormContainerS = styled.div`
  margin: 2vh 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FieldContainerS = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  gap: 4px;
`;

export const FieldLabelS = styled(UbuntuRegular)`
  color: #010736dd;
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
