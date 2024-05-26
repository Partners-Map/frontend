import styled from 'styled-components';
import { ButtonProps } from '../../components/button';

export const ButtonS = styled.div<{ backgroundColor: ButtonProps['backgroundColor'] }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1vw;
  padding: 1vh 4vw 1vh 4vw;
  background-color: ${({ backgroundColor }): string =>
    backgroundColor === 'blue' ? '#010837' : '#fff'};
  color: #fff;
  border: 1px solid
    ${({ backgroundColor }): string => (backgroundColor === 'blue' ? '#d9d9d9' : '#010837')};
  border-radius: 10px;
`;
