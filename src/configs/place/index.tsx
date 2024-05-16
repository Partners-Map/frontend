import { AddressForm } from '../../components/address-form';
import { CreatePartner } from '../../components/create-partner';
import { PartnerForm } from '../../components/partner-form';
import { PlaceForm } from '../../components/place-form';
import { PresendNewPlace } from '../../components/presend-new-place';

export type TSteps = {
  [key: string]: JSX.Element;
};

export const PlaceSteps: TSteps = {
  SelectPartner: <PartnerForm />,
  CreatePartner: <CreatePartner />,
  CreatePlace: <PlaceForm />,
  AddAddress: <AddressForm />,
  PresendPlace: <PresendNewPlace />
};
