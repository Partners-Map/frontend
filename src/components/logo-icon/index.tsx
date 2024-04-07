import { FunctionComponent } from 'react';
import { LockIcon } from '../../styles/icons/lock';

export const LogoIcon: FunctionComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '10vw',
        height: '10vw',
        marginRight: '2vw',
        borderRadius: '100%'
      }}
    >
      <LockIcon src='/icons/logo.svg?url' alt='LogoIcon' />
    </div>
  );
};
