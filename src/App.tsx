import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRouter } from './components/private-router';
import { AdminHub } from './pages/admin-hub';
import { СategoriesPage } from './pages/categories';
import { EditCategoryPage } from './pages/edit-category';
import { EditPlacePage } from './pages/edit-place';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { MapPage } from './pages/map';
import { NewCategoryPage } from './pages/new-category';
import { CreatePage } from './pages/new-place';
import { NotFoundPage } from './pages/not-found';
import { PlacePage } from './pages/place';
import { PlacesPage } from './pages/places';
import { ServiceUnavailablePage } from './pages/service-unavailable';
import { RoutesList } from './routers';
import ResetStyles from './styles/reset';

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
            <Route path='admin-hub' element={<PrivateRouter element={<AdminHub />} />} />
            <Route path='places' element={<PrivateRouter element={<PlacesPage />} />} />
            <Route path='categories' element={<PrivateRouter element={<СategoriesPage />} />} />
            <Route path='new-category' element={<PrivateRouter element={<NewCategoryPage />} />} />
            <Route
              path='edit-category/:id'
              element={<PrivateRouter element={<EditCategoryPage />} />}
            />
            <Route path='new-place/:step' element={<PrivateRouter element={<CreatePage />} />} />
            <Route
              path='edit-place/:id/:step'
              element={<PrivateRouter element={<EditPlacePage />} />}
            />
            <Route path='*' element={<Navigate to={RoutesList.AdminHub} replace={true} />} />
          </Route>
          <Route path='service-unavailable' element={<ServiceUnavailablePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
