import styled from 'styled-components';

export const PartnerTitleS = styled.h1<{ selected: boolean }>`
  color: ${({ selected }): string => (selected ? '#fff' : '#000')};
  font-size: 14px;
`;

export const PartnersListContainerS = styled.div`
  margin: 4vh 0 0 0;
  max-height: 56vh;
  overflow: auto;
  list-style: none;
`;

export const PartnerContainerS = styled.div<{ firstItem: boolean; selected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vh 2vw 1vh 2vw;
  margin: ${({ firstItem }): string => (firstItem ? '0' : '1vh')} 0 1vh 0;
  background-color: ${({ selected }): string => (selected ? '#010837' : '#fff')};
  border: 1px solid #fff;
  border-radius: 6px;
`;

export const NewPartnerButtonContainerS = styled.div`
  display: flex;
  justify-content: center;
  margin: 2vh 0 0 0;
`;
