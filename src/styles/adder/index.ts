import styled from 'styled-components';

export const AdderLabelS = styled.h1`
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

export const AddedItemTitleS = styled.h1`
  color: #010736dd;
`;

export const AdderHelperTextS = styled.h2`
  font-size: 12px;
  color: #cccccc;
`;
