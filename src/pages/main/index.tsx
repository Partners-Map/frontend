import { FunctionComponent } from 'react';
import { useGetCategoriesQuery } from '../../__data__/services/category';
import { Banner } from '../../components/banner';
import { Filters } from '../../components/filters';
import { Header } from '../../components/header';
import { PlacesList } from '../../components/places-list';
import { TagCloud } from '../../components/tag-cloud';
import { PageContainerS } from '../../styles/page-container';

export const MainPage: FunctionComponent = (): JSX.Element => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <PageContainerS>
      <Header />
      <Banner />
      {categories && <TagCloud categories={categories} />}
      <Filters />
      <PlacesList />
    </PageContainerS>
  );
};
