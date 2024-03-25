import { FunctionComponent } from 'react';

export const Banner: FunctionComponent = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1vh'
      }}
    >
      <h2>Система лояльности</h2>
      <p>
        Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а
        также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации
        "Здесь ваш текст..
      </p>
    </div>
  );
};
