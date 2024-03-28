import { FunctionComponent } from 'react';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { useGetPlacesWithAddressQuery } from '../../__data__/services/place';
import { Banner } from '../../components/banner';
import { Button } from '../../components/button';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { PlacesList } from '../../components/places-list';
import { TagCloud } from '../../components/tag-cloud';
import { ButtonContainerS, PageContainerS } from '../../styles/page-container';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routers';

export const MainPage: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const { data: categories } = useGetCategoriesQuery();
  const { data: placesWithAddress } = useGetPlacesWithAddressQuery();

  const goMapPage = (): void => {
    navigate(RoutesList.MapPage);
  };

  return (
    <PageContainerS>
      <Header />
      <Banner />
      {categories && <TagCloud categories={categories} />}
      <Filters />
      {placesWithAddress && <PlacesList data={placesWithAddress} />}
      <ButtonContainerS>
        <Button title={'Показать на карте'} onClick={goMapPage} />
      </ButtonContainerS>
    </PageContainerS>
  );
};
