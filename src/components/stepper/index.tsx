import { FunctionComponent } from 'react';

type StepperProps = {
  step: string;
};

type TStepsText = {
  [key: string]: string;
};

export const Stepper: FunctionComponent<StepperProps> = ({ step }): JSX.Element => {
  const stepsText: TStepsText = {
    SelectPartner: 'Добавление партнера',
    CreatePartner: 'Создание партнера',
    CreatePlace: 'Добавление места',
    AddAddress: 'Добавление адреса',
    PresendPlace: 'Итого'
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
      >{`Шаг ${step !== 'SelectPartner' ? Object.keys(stepsText).findIndex(value => value === step) : 1} - ${stepsText[step]}`}</h1>
    </div>
  );
};
