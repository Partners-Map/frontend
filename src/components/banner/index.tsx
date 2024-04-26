import { FunctionComponent } from 'react';
import { BunnerContainerS, BunnerTextS, BunnerTitleS } from '../../styles/banner';

export const Banner: FunctionComponent = (): JSX.Element => {
  return (
    <BunnerContainerS>
      <BunnerTitleS>Партнерская экосистема СберПорта</BunnerTitleS>
      <BunnerTextS>
        Партнерская экосистема СберПорта – это уникальная программа лояльности для резидентов
        ИТ-центра по разработке продуктов Корпоративно-инвестиционного бизнеса Сбера в Сочи,
        включающая индивидуальные скидки и предложения в различных заведениях Сочи.
      </BunnerTextS>
    </BunnerContainerS>
  );
};
