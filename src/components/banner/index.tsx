import { Typography } from '@mui/material';
import { FunctionComponent } from 'react';
import { BunnerContainerS } from '../../styles/banner';

export const Banner: FunctionComponent = (): JSX.Element => {
  return (
    <BunnerContainerS>
      <Typography variant='h5' align={'center'}>
        Партнерская экосистема СберПорта
      </Typography>
    </BunnerContainerS>
  );
};
