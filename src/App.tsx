import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { EditPlacePage } from './pages/edit-place';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { MapPage } from './pages/map';
import { CreatePage } from './pages/new-place';
import { NotFoundPage } from './pages/not-found';
import { PlacePage } from './pages/place';
import { PlacesPage } from './pages/places';
import { ServiceUnavailablePage } from './pages/service-unavailable';
import { RoutesList } from './routers';
import ResetStyles from './styles/reset';
import { AdminHub } from './pages/admin-hub';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ResetStyles />
      <Routes>
        <Route path={'/'}>
          <Route index element={<HomePage />} />
          <Route path='place/:id' element={<PlacePage />} />
          <Route path='map' element={<MapPage />} />
          <Route path={'admin'}>
            <Route index element={<Navigate to={RoutesList.LoginPage} />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='admin-hub' element={<AdminHub />} />
            <Route path='places' element={<PlacesPage />} />
            {/* TODO  CategoriesPage */}
            {/* <Route path='categories' element={<CategoriesPage />} /> */}
            <Route path='new-place/:step' element={<CreatePage />} />
            <Route path='edit-place/:id/:step' element={<EditPlacePage />} />
            <Route path='*' element={<Navigate to={RoutesList.AdminHub} replace={true} />} />
          </Route>
          <Route path='service-unavailable' element={<ServiceUnavailablePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
