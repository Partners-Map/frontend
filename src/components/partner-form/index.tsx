import { FunctionComponent, useEffect, useState } from 'react';
import { TPartner } from '../../@types/models/partner';
import { useGetPartnersQuery } from '../../__data__/services/partners';
import {
  NewPartnerButtonContainerS,
  PartnerContainerS,
  PartnerTitleS,
  PartnersListContainerS
} from '../../styles/partner-form';
import { SearchInputS } from '../../styles/search-input';
import { Button } from '../button';
import BlackPlusIcon from '/public/icons/black-plus-icon.svg?react';
import WhitePlusIcon from '/public/icons/white-plus-icon.svg?react';

export const PartnerForm: FunctionComponent = (): JSX.Element => {
  const { data: partners } = useGetPartnersQuery();
  const firstPartner = (partners || [])[0];
  const [isSelectedId, setIsSelectedId] = useState<string>('');

  const handlerSelectPartner = (partner: TPartner): void => {
    setIsSelectedId(partner.id);
    console.log(partner);
  };

  const handlerCreatePartner = (): void => {};

  useEffect(() => {
    if (firstPartner) {
      setIsSelectedId(firstPartner.id);
    }
  }, [firstPartner, partners]);

  return (
    <>
      <SearchInputS type='text' placeholder='Название партнера...' />
      <PartnersListContainerS>
        {partners?.map((partner, index) => (
          <PartnerContainerS
            key={partner.id}
            firstItem={index === 0}
            selected={isSelectedId === partner.id}
          >
            <PartnerTitleS selected={isSelectedId === partner.id}>{partner.name}</PartnerTitleS>
            {isSelectedId === partner.id ? (
              <WhitePlusIcon onClick={() => handlerSelectPartner(partner)} width={24} height={24} />
            ) : (
              <BlackPlusIcon onClick={() => handlerSelectPartner(partner)} width={24} height={24} />
            )}
          </PartnerContainerS>
        ))}
      </PartnersListContainerS>
      <NewPartnerButtonContainerS>
        <Button
          title='Добавить нового партнера'
          icon={WhitePlusIcon}
          iconSize={24}
          onClick={handlerCreatePartner}
        />
      </NewPartnerButtonContainerS>
    </>
  );
};
