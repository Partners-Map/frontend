import { FunctionComponent } from 'react';
import { AuthIcon } from '../auth-icon';

export const LoginForm: FunctionComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60vw',
        marginTop: '20vh'
      }}
    >
      <AuthIcon />
      <input
        type='email'
        style={{
          width: '100%'
        }}
      />
      <input
        type='password'
        style={{
          width: '100%'
        }}
      />
    </div>
  );
};
