import styled from 'styled-components';
import { UbuntuRegular } from '../fonts';

export const TextareaS = styled.textarea`
  max-width: 400px;
  resize: vertical;
  min-height: 14vh;
  border: 1px solid #cccccc;
  border-radius: 6px;
  padding: 1vh;

  &::placeholder {
    font-size: 14px;
    color: #cccccc;
  }

  &:focus {
    outline: none;
  }
`;

export const TextareaLabelS = styled(UbuntuRegular)`
  color: #010736dd;
`;
