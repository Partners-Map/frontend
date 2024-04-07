import { FunctionComponent } from 'react';
import { Header } from '../../components/header';
import { ButtonContainerS, PageContainerS } from '../../styles/page-container';
import { Search } from '../../components/search';
import { Filters } from '../../components/filters';
import { useGetPlacesWithAddressQuery } from '../../__data__/services/place';
import { PlacesList } from '../../components/places-list';
import { Button } from '../../components/button';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routers';

export const PlacesPage: FunctionComponent = () => {
  const { data: placesWithAddress } = useGetPlacesWithAddressQuery();
  const navigate = useNavigate();

  const goToNewPlace = (): void => {
    navigate(RoutesList.NewPlace + 1);
  };

  return (
    <PageContainerS>
      <Header isAdmin />
      <Search style={{ margin: '4vh 0 0 0', width: '100%' }} />
      <Filters />
      {placesWithAddress && <PlacesList data={placesWithAddress} />}
      <ButtonContainerS>
        <Button title={'Показать на карте'} onClick={goToNewPlace} />
      </ButtonContainerS>
    </PageContainerS>
  );
};
