import { FunctionComponent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AddressForm } from '../../components/address-form';
import { Button } from '../../components/button';
import { Header } from '../../components/header';
import { PartnerForm } from '../../components/partner-form';
import { PlaceForm } from '../../components/place-form';
import { PresendNewPlace } from '../../components/presend-new-place';
import { Stepper } from '../../components/stepper';
import { ButtonsContainerS } from '../../styles/new-place';
import { PageContainerS } from '../../styles/page-container';

type TSteps = {
  [key: number]: JSX.Element;
};

export const CreatePage: FunctionComponent = (): JSX.Element => {
  const { step } = useParams();
  const currentStep = Number(step);
  const navigate = useNavigate();

  const handlerNextStep = (): void => {
    navigate(`/admin/create/${currentStep + 1}`);
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
      navigate('/admin/places');
    }
  });

  return (
    <PageContainerS>
      <Header isAdmin />
      <Stepper step={currentStep} />
      {stepsComponents[currentStep]}
      <ButtonsContainerS>
        <Button onClick={handlerNextStep} title={isLastStep() ? 'Опубликовать' : 'Следующий шаг'} />
      </ButtonsContainerS>
    </PageContainerS>
  );
};
