import { FunctionComponent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AddressForm } from '../../components/address-form';
import { Button } from '../../components/button';
import { Header } from '../../components/header';
import { PartnerForm } from '../../components/partner-form';
import { PlaceForm } from '../../components/place-form';
import { PresendNewPlace } from '../../components/presend-new-place';
import { Stepper } from '../../components/stepper';
import { RoutesList } from '../../routers';
import { ButtonsContainerS, ContentWrapperS, MainContentWrapperS } from '../../styles/new-place';
import { PageContainerS } from '../../styles/page-container';
import ArrowLeftIcon from '/public/icons/arrow-left.svg?react';

type TSteps = {
  [key: number]: JSX.Element;
};

export const CreatePage: FunctionComponent = (): JSX.Element => {
  const { step } = useParams();
  const currentStep = Number(step);
  const navigate = useNavigate();

  const haveBackButton = (): boolean => {
    return currentStep !== 1;
  };

  const handlerNextStep = (): void => {
    navigate(RoutesList.NewPlace + (currentStep + 1));
  };

  const handlerBackStep = (): void => {
    navigate(RoutesList.NewPlace + (currentStep - 1));
  };

  const isLastStep = (): boolean => {
    return currentStep === 4;
  };

  const stepsComponents: TSteps = {
    1: <PartnerForm />,
    2: <PlaceForm />,
    3: <AddressForm />,
    4: <PresendNewPlace />
  };

  useEffect(() => {
    if (!Object.keys(stepsComponents).includes(currentStep.toString())) {
      navigate(RoutesList.PlacesPage);
    }
  });

  return (
    <PageContainerS>
      <ContentWrapperS>
        <MainContentWrapperS>
          <Header isAdmin />
          <Stepper step={currentStep} />
          {stepsComponents[currentStep]}
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
          <Button
            onClick={handlerNextStep}
            title={isLastStep() ? 'Опубликовать' : 'Следующий шаг'}
          />
        </ButtonsContainerS>
      </ContentWrapperS>
    </PageContainerS>
  );
};
