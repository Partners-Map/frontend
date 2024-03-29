import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { PlaceInfo } from '../../components/place-info';
import { PageContainerS } from '../../styles/page-container';
import { useGetPlaceByIdQuery } from '../../__data__/services/place';
import { Header } from '../../components/header';

export const PlacePage: FunctionComponent = (): JSX.Element => {
  const { id } = useParams();
  const { data: place } = useGetPlaceByIdQuery(id ?? '');

  return (
    <PageContainerS>
      <Header />
      {place && <PlaceInfo data={place} />}
    </PageContainerS>
  );
};
