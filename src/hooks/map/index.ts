import { load } from '@2gis/mapgl';
import { useEffect, useState } from 'react';
import mapglAPI from '../../../node_modules/@2gis/mapgl/types/index';

export type MapInstance = {
  map: mapglAPI.Map;
  mapglAPI: typeof mapglAPI;
};

export type useMapProps = {
  options: mapglAPI.MapOptions;
  containerId?: string;
};

export const useMap = ({ options, containerId = 'map-container' }: useMapProps): MapInstance | null => {
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);

  useEffect(() => {
    const initializeMap = async (): Promise<void> => {
      const mapglAPI = await load();
      const mapInstance = new mapglAPI.Map(containerId, {
        ...options,
        key: 'ab751225-efc7-4674-abc5-9d2a5f7f233b'
      });
      setMapInstance({ map: mapInstance, mapglAPI });
    };

    initializeMap();

    return () => {
      if (mapInstance) {
        mapInstance.map.destroy();
      }
    };
  }, []);

  return mapInstance;
};
