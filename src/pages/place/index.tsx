import { FunctionComponent } from 'react';
import { PageContainerS } from '../../styles/page-container';

export const PlacePage: FunctionComponent = (): JSX.Element => {
  return (
    <PageContainerS>
      <Info data={data} />
    </PageContainerS>
  );
};
