import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SberLine } from './components/sber-line';
import { LoginPage } from './pages/login';
import { MainPage } from './pages/main';
import ResetStyles from './styles/reset';

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ResetStyles />
      <SberLine />
      <Routes>
        <Route path={'/'}>
          <Route index element={<MainPage />} />
          <Route path={'auth'}>
            <Route index element={<Navigate to={'/auth/login'} />} />
            <Route path='login' element={<LoginPage />} />
          </Route>

          <Route path='*' element={<Navigate to='/' replace={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
