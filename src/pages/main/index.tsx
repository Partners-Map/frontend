import { useEffect } from 'react';
import { PlacesList } from '../../components/places-list';
import { SearchField } from '../../components/search-field';
import { useGetPlacesQuery } from '../../__data__/services/place';

export const MainPage = () => {
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
