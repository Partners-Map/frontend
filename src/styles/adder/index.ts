import styled from 'styled-components';
import { UbuntuRegular } from '../fonts';

export const AdderLabelS = styled(UbuntuRegular)`
  color: #010736dd;
`;

export const AdderContainerS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ListS = styled.div<{ isAddress?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: ${({ isAddress }): string => (isAddress ? '24vh' : 'none')};
  height: ${({ isAddress }): string => (isAddress ? '24vh' : 'none')};
  overflow-y: auto;
`;

export const AddedItemTitleS = styled(UbuntuRegular)`
  color: #010736dd;
`;
