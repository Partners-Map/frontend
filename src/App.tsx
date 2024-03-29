import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PlacePage } from './pages/place';
import { LoginPage } from './pages/login';
import { MainPage } from './pages/main';
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
          <Route path={'admin'}>
            <Route index element={<Navigate to={RoutesList.LoginPage} />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='dashboard' element={<MainPage />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
