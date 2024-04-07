import { FunctionComponent } from 'react';
import { BunnerContainerS, BunnerTextS, BunnerTitleS } from '../../styles/banner';

export const Banner: FunctionComponent = (): JSX.Element => {
  return (
    <BunnerContainerS>
      <BunnerTitleS>Система лояльности</BunnerTitleS>
      <BunnerTextS>
        Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение
        шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при
        простой дубликации "Здесь ваш текст..
      </BunnerTextS>
    </BunnerContainerS>
  );
};
