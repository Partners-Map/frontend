import { Box } from '@mui/material';
import styled from 'styled-components';

export const PlaceInfoContainer = styled(Box)`
  margin: 2vh 0 0 0;
  display: flex;
  flex-direction: column;
`;

export const PlaceInfoTitle = styled.h1`
  font-size: 20px;
`;

export const PlaceInfoCategory = styled.h1`
  font-size: 14px;
`;

export const PlaceInfoExtraContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.4vh 0 0 0;
  gap: 4px;
`;

export const PlaceInfoExtraText = styled.h1`
  font-size: 12px;
`;

export const PlaceInfoDescription = styled.h1`
  font-size: 14px;
  margin: 2vh 0 0 0;
`;

export const PlaceInfoDescriptionText = styled.p`
  font-size: 14px;
`;

export const PlaceInfoConditions = styled.h1`
  font-size: 14px;
  margin: 2vh 0 0 0;
`;

export const PlaceInfoConditionsText = styled.p`
  font-size: 14px;
`;
