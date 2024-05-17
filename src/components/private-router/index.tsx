import { FunctionComponent, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutesList } from '../../routers';

type PrivateRouterProps = {
  element: ReactNode;
};

export const PrivateRouter: FunctionComponent<PrivateRouterProps> = ({ element }) => {
  const chackAuthStatus = (): boolean => {
    return sessionStorage.getItem('auth-user') === 'true';
  };

  return chackAuthStatus() ? element : <Navigate to={RoutesList.LoginPage} replace />;
};
