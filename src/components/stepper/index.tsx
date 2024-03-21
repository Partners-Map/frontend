import { FunctionComponent } from 'react';

type TStepperProps = {
  step: number;
};

export const Stepper: FunctionComponent<TStepperProps> = ({ step }): JSX.Element => {
  return (
    <div
      style={{
        paddingTop: '10vh'
      }}
    >
      {step}
    </div>
  );
};
