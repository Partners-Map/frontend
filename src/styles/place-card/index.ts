import { Box, Paper } from '@mui/material';
import styled from 'styled-components';

export const PlaceCardContainerS = styled(Paper)`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  width: 100%;
  gap: 4px;
  padding: 8px;
`;

export const PlaceCardTitleS = styled.h1`
  font-size: 12px;
`;

export const PlaceCardAddressS = styled.h1`
  font-size: 8px;
`;

export const PlaceCardDescriptionS = styled.p`
  font-size: 8px;
  color: #a9a9a9;
`;

export const PlaceCardOtherInfoContainerS = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const PlaceCardOtherInfoTextS = styled.h2`
  font-size: 8px;
`;
