import { FunctionComponent } from 'react';
import { AuthIconBackground } from '../../styles/auth-icon';
import { LockIcon } from '../../styles/icons/lock';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const AuthIcon: FunctionComponent = () => {
  return (
    <AuthIconBackground>
      <LockOutlinedIcon />
    </AuthIconBackground>
  );
};
