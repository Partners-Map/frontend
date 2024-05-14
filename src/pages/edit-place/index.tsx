import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetPlaceByIdWithCategoryQuery,
  useGetPlaceByIdWithFullInfoQuery,
  useUpdatePlaceWithFullInfoMutation
} from '../../__data__/services/place';
import { initEditData } from '../../__data__/slices/edit-place';
import { RootState } from '../../__data__/store';
import { Button } from '../../components/button';
import { Header } from '../../components/header';
import { Stepper } from '../../components/stepper';
import { PlaceSteps } from '../../configs/place';
import { RoutesList } from '../../routers';
import { ButtonsContainerS, ContentWrapperS, MainContentWrapperS } from '../../styles/new-place';
import { PageContainerS } from '../../styles/pages';
import { transformObject } from '../../utils/transform-object';
import ArrowLeftIcon from '/public/icons/arrow-left.svg?react';

export const EditPlacePage = (): JSX.Element => {
  const [updatePlace] = useUpdatePlaceWithFullInfoMutation();
  const { id, step: currentStep } = useParams();
  const { data: placeWithFullInfo } = useGetPlaceByIdWithFullInfoQuery(id!);
  const { data: placeWithCategory } = useGetPlaceByIdWithCategoryQuery(id!);
  const editPlaceState = useSelector((state: RootState) => state.editPlaceSlice);
  const firstStepTitle = Object.keys(PlaceSteps)[0];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const haveBackButton = (): boolean => {
    return currentStep !== firstStepTitle;
  };

  const handlerNextStep = (): void => {
    if (currentStep === firstStepTitle) {
      navigate(`${RoutesList.EditPlace + id}/${Object.keys(PlaceSteps)[2]}`);
      return;
    }
    navigate(
      RoutesList.EditPlace +
        id +
        '/' +
        Object.keys(PlaceSteps)[
          Object.keys(PlaceSteps).findIndex(element => element === currentStep) + 1
        ]
    );
  };

  const handlerBackStep = (): void => {
    if (currentStep === Object.keys(PlaceSteps)[2]) {
      navigate(RoutesList.EditPlace + id + '/' + firstStepTitle);
      return;
    }
    navigate(
      RoutesList.EditPlace +
        id +
        '/' +
        Object.keys(PlaceSteps)[
          Object.keys(PlaceSteps).findIndex(element => element === currentStep) - 1
        ]
    );
  };

  const isLastStep = (): boolean => {
    return currentStep === Object.keys(PlaceSteps)[Object.keys(PlaceSteps).length - 1];
  };

  const handlerSave = async (): Promise<void> => {
    await updatePlace({ id: id!, data: editPlaceState })
      .unwrap()
      .then(() => {
        navigate(RoutesList.PlacesPage, { replace: true });
      });
  };

  useEffect(() => {
    if (!Object.keys(PlaceSteps).includes(currentStep!) || !id) {
      navigate(RoutesList.PlacesPage, { replace: true });
    }
  });

  useEffect(() => {
    if (placeWithFullInfo && placeWithCategory) {
      dispatch(initEditData(transformObject(placeWithFullInfo, placeWithCategory[0])));
    }
  }, [placeWithFullInfo, placeWithCategory]);

  return (
    <PageContainerS>
      <ContentWrapperS>
        <MainContentWrapperS>
          <Header isAdmin />
          <Stepper step={currentStep!} />
          {placeWithFullInfo && placeWithCategory && PlaceSteps[currentStep!]}
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
