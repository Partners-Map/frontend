import { useGetPlacesQuery } from '../../__data__/services/place';
import { Banner } from '../../components/banner';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { PlacesList } from '../../components/places-list';
import { TagCloud } from '../../components/tag-cloud';

export const MainPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <TagCloud />
      <Filters />
      <PlacesList />
    </>
  );
};
