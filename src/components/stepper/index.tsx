import { FunctionComponent } from 'react';

type StepperProps = {
  step: number;
};

type TStepsText = {
  [key: number]: string;
};

export const Stepper: FunctionComponent<StepperProps> = ({ step }): JSX.Element => {
  const stepsText: TStepsText = {
    1: 'Добавление партнера',
    2: 'Добавление места',
    3: 'Добавление адреса',
    4: 'Итого'
  };

  return (
    <div
      style={{
        margin: '4vh 0 0 0',
        width: '100%'
      }}
    >
      <h1
        style={{
          fontSize: '20px'
        }}
      >{`Шаг ${step} - ${stepsText[step]}`}</h1>
    </div>
  );
};
