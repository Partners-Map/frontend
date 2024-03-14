import { FunctionComponent } from 'react';
import { AuthIconBackground } from '../../styles/auth-icon';
import { LockIcon } from '../../styles/icons/lock';

export const AuthIcon: FunctionComponent = () => {
  return (
    <AuthIconBackground>
      <LockIcon src='/icons/lock.svg?url' alt='LockIcon' />
    </AuthIconBackground>
  );
};
