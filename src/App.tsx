import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SberLine } from './components/sber-line';
import { LoginPage } from './pages/login';
import { MainPage } from './pages/main';
import { CreatePage } from './pages/new-place';
import ResetStyles from './styles/reset';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ResetStyles />
      <SberLine />
      <Routes>
        <Route path={'/'}>
          <Route index element={<MainPage />} />
          <Route path={'admin'}>
            <Route index element={<Navigate to={'/admin/login'} />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='dashboard' element={<MainPage />} />
            <Route path='create/:step' element={<CreatePage />} />
          </Route>

          <Route path='*' element={<Navigate to='/' replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
