import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPlaceByIdWithFullInfoQuery } from '../../__data__/services/place';
import { EditPlaceState } from '../../__data__/slices/edit-place';
import { AddressForm } from '../../components/address-form';
import { Button } from '../../components/button';
import { CreatePartner } from '../../components/create-partner';
import { Header } from '../../components/header';
import { PartnerForm } from '../../components/partner-form';
import { PlaceForm } from '../../components/place-form';
import { PresendNewPlace } from '../../components/presend-new-place';
import { Stepper } from '../../components/stepper';
import { RoutesList } from '../../routers';
import { ButtonsContainerS, ContentWrapperS, MainContentWrapperS } from '../../styles/new-place';
import { PageContainerS } from '../../styles/page-container';
import { TSteps } from '../new-place';
import ArrowLeftIcon from '/public/icons/arrow-left.svg?react';

export const EditPlacePage = (): JSX.Element => {
  const { id, step: currentStep } = useParams();
  const { data } = useGetPlaceByIdWithFullInfoQuery(id!);
  const navigate = useNavigate();
  const currentEditPlace = useSelector(
    (state: { editPlaceSlice: EditPlaceState }) => state.editPlaceSlice
  );

  const stepsComponents: TSteps = {
    SelectPartner: <PartnerForm isEditing partnerId={data?.partnerId} />,
    CreatePartner: <CreatePartner />,
    CreatePlace: <PlaceForm isEditing />,
    AddAddress: <AddressForm />,
    PresendPlace: <PresendNewPlace />
  };

  const haveBackButton = (): boolean => {
    return currentStep !== 'SelectPartner';
  };

  const handlerNextStep = (): void => {
    if (currentStep === 'SelectPartner') {
      navigate(RoutesList.EditPlace + id + '/CreatePlace');
      return;
    }
    navigate(
      RoutesList.EditPlace +
        id +
        '/' +
        Object.keys(stepsComponents)[
          Object.keys(stepsComponents).findIndex(element => element === currentStep) + 1
        ]
    );
  };

  const handlerBackStep = (): void => {
    if (currentStep === 'CreatePlace') {
      navigate(RoutesList.EditPlace + id + '/' + 'SelectPartner');
      return;
    }
    navigate(
      RoutesList.EditPlace +
        id +
        '/' +
        Object.keys(stepsComponents)[
          Object.keys(stepsComponents).findIndex(element => element === currentStep) - 1
        ]
    );
  };

  const isLastStep = (): boolean => {
    return currentStep === Object.keys(stepsComponents)[Object.keys(stepsComponents).length - 1];
  };

  const handlerSave = (): void => {
    //TODO сохранение изменений
  };

  useEffect(() => {
    if (!Object.keys(stepsComponents).includes(currentStep!) || !id) {
      navigate(RoutesList.PlacesPage);
    }
  });

  return (
    <PageContainerS>
      <ContentWrapperS>
        <MainContentWrapperS>
          <Header isAdmin />
          <Stepper step={currentStep!} />
          {data && stepsComponents[currentStep!]}
        </MainContentWrapperS>
        <ButtonsContainerS>
          {haveBackButton() ? (
            <Button
              icon={ArrowLeftIcon}
              iconSize={19}
              backgroundColor='white'
              onClick={handlerBackStep}
            />
          ) : (
            <div></div>
          )}
          {currentStep !== 'CreatePartner' ? (
            <Button
              onClick={isLastStep() ? handlerSave : handlerNextStep}
              title={isLastStep() ? 'Сохранить' : 'Следующий шаг'}
            />
          ) : (
            <div></div>
          )}
        </ButtonsContainerS>
      </ContentWrapperS>
    </PageContainerS>
  );
};
