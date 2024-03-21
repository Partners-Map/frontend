import { FunctionComponent } from 'react';
import { useGetPlacesQuery } from '../../__data__/services/place';
import { PlacesList } from '../../components/places-list';
import { SearchField } from '../../components/search-field';

export const MainPage: FunctionComponent = (): JSX.Element => {
  const { isError, data } = useGetPlacesQuery();

  return (
    <>
      {data ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '40px'
          }}
        >
          <SearchField />
          <PlacesList data={data} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
