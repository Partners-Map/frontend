import { FunctionComponent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AddressForm } from '../../components/address-form';
import { DiscountFrom } from '../../components/discount-form';
import { PartnerForm } from '../../components/partner-form';
import { PlaceForm } from '../../components/place-form';
import { Stepper } from '../../components/stepper';

export const CreatePage: FunctionComponent = (): JSX.Element => {
  const { step } = useParams();
  const navigate = useNavigate();

  const handlerNextStep = () => {
    navigate(`/admin/create/${Number(step) + 1}`);
  };

  useEffect(() => {
    if (Number(step) < 1 || Number(step) > 4) {
      navigate('/admin/dashboard');
    }
  });

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Stepper step={Number(step)} />
        {Number(step) === 1 && <PartnerForm />}
        {Number(step) === 2 && <DiscountFrom />}
        {Number(step) === 3 && <PlaceForm />}
        {Number(step) === 4 && <AddressForm />}
        <button
          style={{
            width: '20vw',
            marginTop: '2vh',
            padding: '1vh'
          }}
          onClick={handlerNextStep}
        >
          Далее
        </button>
      </div>
    </>
  );
};
