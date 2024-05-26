import { load } from '@2gis/mapgl';
import mapglAPI from '@2gis/mapgl/types/index';
import { useEffect, useState } from 'react';

export type MapInstance = {
  map: mapglAPI.Map;
  mapglAPI: typeof mapglAPI;
};

export type useMapProps = {
  options: mapglAPI.MapOptions;
  containerId?: string;
};

export const useMap = ({
  options,
  containerId = 'map-container'
}: useMapProps): MapInstance | null => {
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);

  useEffect(() => {
    const initializeMap = async (): Promise<void> => {
      const mapglAPI = await load();
      const mapInstance = new mapglAPI.Map(containerId, {
        ...options,
        key: String(import.meta.env.VITE_API_KEY)
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
