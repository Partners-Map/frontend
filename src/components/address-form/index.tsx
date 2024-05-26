import mapglAPI from '@2gis/mapgl/types/index';
import { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import type { TNewAddress } from '../../@types/models/address';
import { useGeocoderMutation } from '../../__data__/services/2gis';
import { setAddress as setEditPlaceAddress } from '../../__data__/slices/edit-place';
import { setAddress as setNewPlaceAddress } from '../../__data__/slices/new-place';
import { RootState } from '../../__data__/store';
import { useMap } from '../../hooks/map';
import { RoutesList } from '../../routers';
import { Adder } from '../adder';
import { MapWrapper } from '../map-wrapper';

export const AddressForm: FunctionComponent = (): JSX.Element => {
  const isEditing = useLocation().pathname.startsWith(RoutesList.EditPlace);
  const { newPlaceSlice: newPlaceState, editPlaceSlice: editPlaceState } = useSelector(
    (state: RootState) => state
  );
  const baseLongitude = 39.7257;
  const baseLatitude = 43.5992;
  const [addetingError, setAddetingError] = useState<boolean>(false);
  const map = useMap({
    options: {
      center: [baseLongitude, baseLatitude],
      zoom: 9
    }
  });
  // формат: "Москва, Садовническая, 25"
  const [geocoding] = useGeocoderMutation();
  const dispatch = useDispatch();

  const parseAddress = (addressString: string): any => {
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

  const addressAssembly = (addresses: TNewAddress[]): string[] =>
    addresses.map(address => `${address.city}, ${address.street}, ${address.house}`);

  const handlerAddressDelete = (value: string): void => {
    dispatch(
      isEditing
        ? setEditPlaceAddress(
            editPlaceState.addresses.filter(
              address => `${address.city}, ${address.street}, ${address.house}` !== value
            )
          )
        : setNewPlaceAddress(
            newPlaceState.addresses.filter(
              address => `${address.city}, ${address.street}, ${address.house}` !== value
            )
          )
    );
  };

  const handlerAddressAdder = async (value: string): Promise<void> => {
    const clearValue = value.trimStart().trimEnd();
    if (clearValue.length < 1) {
      setAddetingError(true);
      return;
    }
    await geocoding(clearValue)
      .unwrap()
      .then(data => {
        if (!data || data.meta.code !== 200) throw Error();
        setAddetingError(false);
        const addressInfo = parseAddress(value);
        const newAddress = {
          city: addressInfo.city || '',
          street: addressInfo.street || '',
          house: addressInfo.house || '',
          latitude: data.result.items[0].point.lat,
          longitude: data.result.items[0].point.lon
        };
        dispatch(
          isEditing
            ? setEditPlaceAddress([...editPlaceState.addresses, newAddress])
            : setNewPlaceAddress([...newPlaceState.addresses, newAddress])
        );
      })
      .catch(() => {
        setAddetingError(true);
      });
  };

  useEffect(() => {
    const addresses = isEditing ? editPlaceState.addresses : newPlaceState.addresses;
    if (!map || !addresses) return;
    const markers: mapglAPI.Marker[] = [];

    addresses.forEach(address => {
      const marker = new map.mapglAPI.Marker(map.map, {
        coordinates: [Number(address.longitude), Number(address.latitude)]
      });

      markers.push(marker);
    });

    return () => {
      markers.forEach(marker => marker.destroy());
    };
  }, [map]);

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
          addedElements={
            isEditing
              ? addressAssembly(editPlaceState.addresses)
              : addressAssembly(newPlaceState.addresses)
          }
          helperText='пример: "Москва, Садовническая, 25"'
          error={addetingError}
          onDeleteItem={handlerAddressDelete}
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
