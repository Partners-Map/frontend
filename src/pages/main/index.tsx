import { useGetCategoriesQuery } from '../../__data__/services/category';
import { Banner } from '../../components/banner';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { PlacesList } from '../../components/places-list';
import { TagCloud } from '../../components/tag-cloud';

export const MainPage = () => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <>
      <Header />
      <Banner />
      {categories && <TagCloud categories={categories} />}
      <Filters />
      <PlacesList />
    </>
  );
};
