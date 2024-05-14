import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TPartner } from '../../@types/models/partner';
import { useGetPartnersQuery } from '../../__data__/services/partners';
import { EditPlaceState, setPartner as setEditPartner } from '../../__data__/slices/edit-place';
import { NewPlaceState, setPartner as setNewPartner } from '../../__data__/slices/new-place';
import { RoutesList } from '../../routers';
import {
  NewPartnerButtonContainerS,
  PartnerContainerS,
  PartnerTitleS,
  PartnersListContainerS
} from '../../styles/partner-form';
import { Button } from '../button';
import BlackPlusIcon from '/public/icons/black-plus-icon.svg?react';
import WhitePlusIcon from '/public/icons/white-plus-icon.svg?react';
import { RootState } from '../../__data__/store';

export const PartnerForm: FunctionComponent = (): JSX.Element => {
  const { id, step: currentStep } = useParams();
  const isEditing = useLocation().pathname.startsWith(RoutesList.EditPlace);
  const { data: partners, refetch } = useGetPartnersQuery();
  const { newPlaceSlice: newPlaceState, editPlaceSlice: editPlaceState } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSelectPartner = (partner: TPartner): void => {
    dispatch(isEditing ? setEditPartner(partner.id) : setNewPartner(partner.id));
  };

  const handlerCreatePartner = (): void => {
    navigate(RoutesList.NewPlace + 'CreatePartner');
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {/* TODO autocomplete по всем партнерам */}
      {/* <SearchInputS type='text' placeholder='Название партнера...' /> */}
      <PartnersListContainerS>
        {partners?.map((partner, index) => (
          <PartnerContainerS
            key={partner.id}
            firstItem={index === 0}
            selected={
              (isEditing ? editPlaceState.partnerId : newPlaceState.partnerId) === partner.id
            }
            onClick={() => handlerSelectPartner(partner)}
          >
            <PartnerTitleS
              selected={
                (isEditing ? editPlaceState.partnerId : newPlaceState.partnerId) === partner.id
              }
            >
              {partner.name}
            </PartnerTitleS>
            {(isEditing ? editPlaceState.partnerId : newPlaceState.partnerId) === partner.id ? (
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
