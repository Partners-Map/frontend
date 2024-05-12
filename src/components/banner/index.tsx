import { FunctionComponent } from 'react';
import { BunnerContainerS, BunnerTextS, BunnerTitleS } from '../../styles/banner';

export const Banner: FunctionComponent = (): JSX.Element => {
  return (
    <BunnerContainerS>
      <BunnerTitleS>Партнерская экосистема СберПорта</BunnerTitleS>
    </BunnerContainerS>
  );
};
