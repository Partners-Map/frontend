import { List } from '@mui/material';
import styled from 'styled-components';

export const PlaceListContainerS = styled(List)`
  display: flex;
  flex-direction: column;
  margin: 4vh 0 0 0;
  width: 100%;
  max-height: 40vh;
  overflow-y: auto;

  @media screen, (min-height: 768px) {
    max-height: 58vh;
  }
`;
