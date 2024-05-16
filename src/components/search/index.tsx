import { Autocomplete, TextField } from '@mui/material';
import { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetPlacesQuery } from '../../__data__/services/place';
import { RoutesList } from '../../routers';

export const Search: FunctionComponent = (): JSX.Element => {
  const { data: places } = useGetPlacesQuery();
  const navigate = useNavigate();

  const handlerSelectPlace = (id: string): void => {
    navigate(RoutesList.PlacePage + id);
  };

  return (
    <>
      {places ? (
        <Autocomplete
          disablePortal
          options={places.map(place => ({ label: place.title, id: place.id }))}
          sx={{ minWidth: 150 }}
          onChange={(_e, newValue) => {
            if (newValue) handlerSelectPlace(newValue.id);
          }}
          autoComplete
          size='small'
          renderInput={params => <TextField {...params} label='Поиск' />}
        />
      ) : (
        <></>
      )}
    </>
  );
};
