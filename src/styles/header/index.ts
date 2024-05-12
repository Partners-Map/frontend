import { Box } from '@mui/material';
import styled from 'styled-components';
import { HeaderProps } from '../../components/header';

export const HeaderContainerS = styled(Box)<HeaderProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ v2 }): string => (v2 ? 'center' : 'space-between')};
  padding: 2vh 0 0 0;
`;

export const HeaderTextS = styled.h1`
  font-size: 14px;
  color: #010736;
  padding: 1vh 0 1vh 0;
`;
