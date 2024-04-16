import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPlacesWithAddressQuery } from '../../__data__/services/place';
import { Button } from '../../components/button';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { PlacesList } from '../../components/places-list';
import { Search } from '../../components/search';
import { RoutesList } from '../../routers';
import { ButtonContainerS, PageContainerS } from '../../styles/page-container';

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
      {placesWithAddress && <PlacesList data={placesWithAddress} style={{ maxHeight: '62vh' }} />}
      <ButtonContainerS>
        <Button title={'Добавить новое место'} onClick={goToNewPlace} />
      </ButtonContainerS>
    </PageContainerS>
  );
};
