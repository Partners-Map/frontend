import { FunctionComponent } from 'react';
import { CiLock } from 'react-icons/ci';

export const AuthIcon: FunctionComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c7c7c7',
        width: '10vw',
        height: '10vw'
      }}
    >
      <CiLock />
    </div>
  );
};
