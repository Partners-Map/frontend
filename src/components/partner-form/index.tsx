import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TPartner } from '../../@types/models/partner';
import { useGetPartnersQuery } from '../../__data__/services/partners';
import { NewPlaceState, setPartner } from '../../__data__/slices/new-place';
import { RoutesList } from '../../routers';
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
  const { data: partners, refetch } = useGetPartnersQuery();
  const currentPartner = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice.partnerId
  );
  const [isSelectedId, setIsSelectedId] = useState<string>(currentPartner);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSelectPartner = (partner: TPartner): void => {
    dispatch(setPartner(partner.id));
    setIsSelectedId(partner.id);
  };

  const handlerCreatePartner = (): void => {
    navigate(RoutesList.NewPlace + 'CreatePartner');
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <SearchInputS type='text' placeholder='Название партнера...' />
      <PartnersListContainerS>
        {partners?.map((partner, index) => (
          <PartnerContainerS
            key={partner.id}
            firstItem={index === 0}
            selected={isSelectedId === partner.id}
            onClick={() => handlerSelectPartner(partner)}
          >
            <PartnerTitleS selected={isSelectedId === partner.id}>{partner.name}</PartnerTitleS>
            {isSelectedId === partner.id ? (
              <WhitePlusIcon width={24} height={24} />
            ) : (
              <BlackPlusIcon width={24} height={24} />
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
