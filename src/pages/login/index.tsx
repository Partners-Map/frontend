import { FunctionComponent } from 'react';
import { LoginForm } from '../../components/login-form';
import { PageContainerS } from '../../styles/pages';
import { Header } from '../../components/header';

export const LoginPage: FunctionComponent = () => {
  return (
    <PageContainerS>
      <Header isAdmin />
      <LoginForm />
    </PageContainerS>
  );
};
