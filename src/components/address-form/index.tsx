import mapglAPI from '@2gis/mapgl/types/index';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGeocoderMutation } from '../../__data__/services/2gis';
import { NewPlaceState, setAddress } from '../../__data__/slices/new-place';
import { useMap } from '../../hooks/map';
import { Adder, TAdderData } from '../adder';
import { MapWrapper } from '../map-wrapper';

export const AddressForm: FunctionComponent = (): JSX.Element => {
  const currentAddresses = useSelector(
    (state: { newPlaceSlice: NewPlaceState }) => state.newPlaceSlice.addresses
  );
  const baseLongitude = 39.7257;
  const baseLatitude = 43.5992;
  const [addetingError, setAddetingError] = useState<boolean>(false);
  const [addedAddresses, setAddedAddresses] = useState<TAdderData[]>(
    currentAddresses.map(address => ({
      label: `${address.city}, ${address.street}, ${address.house}`
    }))
  );
  const map = useMap({
    options: {
      center: [baseLongitude, baseLatitude],
      zoom: 9
    }
  });
  // Москва, Садовническая, 25
  const [geocoding] = useGeocoderMutation();
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

  const handlerDeleteAddress = (value: string): void => {
    dispatch(
      setAddress(
        addresses.filter(
          address => `${address.city}, ${address.street}, ${address.house}` !== value
        )
      )
    );
    setAddedAddresses(addedAddresses.filter(address => address.label !== value));
  };

  const handlerAddressAdder = async (address: string): Promise<void> => {
    await geocoding(address)
      .unwrap()
      .then(data => {
        if (!data || data.meta.code !== 200) throw Error();
        setAddetingError(false);
        const addressInfo = parseAddress(address);
        const newAddress = {
          city: addressInfo.city || '',
          street: addressInfo.street || '',
          house: addressInfo.house || '',
          latitude: data.result.items[0].point.lat,
          longitude: data.result.items[0].point.lon
        };
        dispatch(setAddress([...addresses, newAddress]));
        setAddedAddresses([...addedAddresses, { label: address }]);
      })
      .catch(() => {
        setAddetingError(true);
      });
  };

  useEffect(() => {
    if (!map || !addresses) return;
    const markers: mapglAPI.Marker[] = [];

    addresses.forEach(place => {
      const marker = new map.mapglAPI.Marker(map.map, {
        coordinates: [Number(place.longitude), Number(place.latitude)]
      });

      markers.push(marker);
    });

    return () => {
      markers.forEach(marker => marker.destroy());
    };
  }, [map, addresses]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          margin: '2vh 0 0 0',
          height: '32vh'
        }}
      >
        <Adder
          label={'Местоположение'}
          placeholder={'Местоположение'}
          onAdding={handlerAddressAdder}
          addedElements={addedAddresses}
          helperText='пример: "Москва, Садовническая, 25"'
          error={addetingError}
          onDeleteItem={handlerDeleteAddress}
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
