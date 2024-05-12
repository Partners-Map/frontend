import { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateFullPlaceMutation } from '../../__data__/services/place';
import { NewPlaceState } from '../../__data__/slices/new-place';
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
import { PageContainerS } from '../../styles/pages';
import ArrowLeftIcon from '/public/icons/arrow-left.svg?react';

export type TSteps = {
  [key: string]: JSX.Element;
};

export const CreatePage: FunctionComponent = (): JSX.Element => {
  const { step: currentStep } = useParams();
  const navigate = useNavigate();
  const currentNewPlace = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice
  );
  const [createFullPlace] = useCreateFullPlaceMutation();

  const stepsComponents: TSteps = {
    SelectPartner: <PartnerForm />,
    CreatePartner: <CreatePartner />,
    CreatePlace: <PlaceForm />,
    AddAddress: <AddressForm />,
    PresendPlace: <PresendNewPlace />
  };

  const haveBackButton = (): boolean => {
    return currentStep !== 'SelectPartner';
  };

  const handlerNextStep = (): void => {
    if (currentStep === 'SelectPartner') {
      navigate(RoutesList.NewPlace + 'CreatePlace');
      return;
    }
    navigate(
      RoutesList.NewPlace +
        Object.keys(stepsComponents)[
          Object.keys(stepsComponents).findIndex(element => element === currentStep) + 1
        ]
    );
  };

  const handlerBackStep = (): void => {
    if (currentStep === 'CreatePlace') {
      navigate(RoutesList.NewPlace + 'SelectPartner');
      return;
    }
    navigate(
      RoutesList.NewPlace +
        Object.keys(stepsComponents)[
          Object.keys(stepsComponents).findIndex(element => element === currentStep) - 1
        ]
    );
  };

  const isLastStep = (): boolean => {
    return currentStep === Object.keys(stepsComponents)[Object.keys(stepsComponents).length - 1];
  };

  const handlerCreate = (): void => {
    createFullPlace(currentNewPlace)
      .unwrap()
      .then(() => {
        navigate(RoutesList.PlacesPage);
      });
  };

  useEffect(() => {
    if (!Object.keys(stepsComponents).includes(currentStep!)) {
      navigate(RoutesList.PlacesPage);
    }
  });

  return (
    <PageContainerS>
      <ContentWrapperS>
        <MainContentWrapperS>
          <Header isAdmin />
          <Stepper step={currentStep!} />
          {stepsComponents[currentStep!]}
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
              onClick={isLastStep() ? handlerCreate : handlerNextStep}
              title={isLastStep() ? 'Опубликовать' : 'Следующий шаг'}
            />
          ) : (
            <div></div>
          )}
        </ButtonsContainerS>
      </ContentWrapperS>
    </PageContainerS>
  );
};
