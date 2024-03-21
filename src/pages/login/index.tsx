import { FunctionComponent } from 'react';
import { LoginForm } from '../../components/login-form';

export const LoginPage: FunctionComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <LoginForm />
    </div>
  );
};
