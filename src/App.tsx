import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { EditPlacePage } from './pages/edit-place';
import { LoginPage } from './pages/login';
import { MainPage } from './pages/main';
import { MapPage } from './pages/map';
import { CreatePage } from './pages/new-place';
import { PlacePage } from './pages/place';
import { PlacesPage } from './pages/places';
import { RoutesList } from './routers';
import ResetStyles from './styles/reset';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ResetStyles />
      <Routes>
        <Route path={'/'}>
          <Route index element={<MainPage />} />
          <Route path='place/:id' element={<PlacePage />} />
          <Route path='map' element={<MapPage />} />
          <Route path={'admin'}>
            <Route index element={<Navigate to={RoutesList.LoginPage} />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='places' element={<PlacesPage />} />
            <Route path='new-place/:step' element={<CreatePage />} />
            <Route path='edit-place/:id/:step' element={<EditPlacePage />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
