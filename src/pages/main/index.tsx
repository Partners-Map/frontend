import { Container } from '@mui/material';
import { PlacesList } from '../../components/places-list';

export const MainPage = () => {
  return (
    <Container maxWidth="md">
      {/* <SerchField /> */}
      <PlacesList />
    </Container>
  );
};
