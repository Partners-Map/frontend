import { FunctionComponent, useEffect, useState } from 'react';
import { useMap } from '../../hooks/map';
import { Adder } from '../adder';
import { MapWrapper } from '../map-wrapper';
import { useGeocoderQuery } from '../../__data__/services/2gis';
import { useDispatch, useSelector } from 'react-redux';
import { NewPlaceState, setAddress } from '../../__data__/slices/new-place';

export const AddressForm: FunctionComponent = (): JSX.Element => {
  const baseLongitude = 39.7257;
  const baseLatitude = 43.5992;
  const [geocoderAddress, setGeocoderAddress] = useState('');
  const map = useMap({
    options: {
      center: [baseLongitude, baseLatitude],
      zoom: 9
    }
  });
  // Москва, Садовническая, 25
  const { data, refetch } = useGeocoderQuery(geocoderAddress);
  const dispatch = useDispatch();
  const addresses = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice.addresses
  );

  const parseAddress = (addressString: string) => {
    const parts = addressString.split(', ');

    if (parts) {
      return {
        city: parts[0],
        street: parts[1],
        house: parts[2]
      };
    } else {
      return {};
    }
  };

  const handlerAddressAdder = (address: string): void => {
    setGeocoderAddress(address);
    refetch();
  };

  useEffect(() => {
    if (data && data.meta.code === 200) {
      const addressInfo = parseAddress(data.result.items[0].full_name);
      const newAddress = {
        city: addressInfo.city || '',
        street: addressInfo.street || '',
        house: addressInfo.house || '',
        latitude: data.result.items[0].point.lat,
        longitude: data.result.items[0].point.lon
      };
      console.log(data.result.items[0].full_name, addressInfo);
      dispatch(setAddress([...addresses, newAddress]));
    }
  }, [data]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          margin: '2vh 0 0 0'
        }}
      >
        <Adder
          label={'Местоположение'}
          placeholder={'Местоположение'}
          isAddress
          onAddressAdder={handlerAddressAdder}
        />
      </div>
      <div
        style={{
          height: '40vh',
          margin: '4vh 0 0 0'
        }}
      >
        <MapWrapper />
      </div>
    </div>
  );
};
