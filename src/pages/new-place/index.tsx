import { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateFullPlaceMutation } from '../../__data__/services/place';
import { NewPlaceState } from '../../__data__/slices/new-place';
import { Button } from '../../components/button';
import { Header } from '../../components/header';
import { Stepper } from '../../components/stepper';
import { PlaceSteps } from '../../configs/place';
import { RoutesList } from '../../routers';
import { ButtonsContainerS, ContentWrapperS, MainContentWrapperS } from '../../styles/new-place';
import { PageContainerS } from '../../styles/pages';
import ArrowLeftIcon from '/public/icons/arrow-left.svg?react';

export const CreatePage: FunctionComponent = (): JSX.Element => {
  const { step: currentStep } = useParams();
  const navigate = useNavigate();
  const firstStepTitle = Object.keys(PlaceSteps)[0];
  const currentNewPlace = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice
  );
  const [createFullPlace] = useCreateFullPlaceMutation();

  const haveBackButton = (): boolean => {
    return currentStep !== firstStepTitle;
  };

  const handlerNextStep = (): void => {
    if (currentStep === firstStepTitle) {
      navigate(RoutesList.NewPlace + Object.keys(PlaceSteps)[2]);
      return;
    }
    navigate(
      RoutesList.NewPlace +
        Object.keys(PlaceSteps)[
          Object.keys(PlaceSteps).findIndex(element => element === currentStep) + 1
        ]
    );
  };

  const handlerBackStep = (): void => {
    if (currentStep === Object.keys(PlaceSteps)[2]) {
      navigate(RoutesList.NewPlace + firstStepTitle);
      return;
    }
    navigate(
      RoutesList.NewPlace +
        Object.keys(PlaceSteps)[
          Object.keys(PlaceSteps).findIndex(element => element === currentStep) - 1
        ]
    );
  };

  const isLastStep = (): boolean => {
    return currentStep === Object.keys(PlaceSteps)[Object.keys(PlaceSteps).length - 1];
  };

  const handlerCreate = (): void => {
    createFullPlace(currentNewPlace)
      .unwrap()
      .then(() => {
        navigate(RoutesList.PlacesPage);
      });
  };

  useEffect(() => {
    if (!Object.keys(PlaceSteps).includes(currentStep!)) {
      navigate(RoutesList.PlacesPage);
    }
  });

  return (
    <PageContainerS>
      <ContentWrapperS>
        <MainContentWrapperS>
          <Header isAdmin />
          <Stepper step={currentStep!} />
          {PlaceSteps[currentStep!]}
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
          {currentStep !== Object.keys(PlaceSteps)[1] ? (
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
