import { useState } from 'react';
import { PlaceCard } from '../place-card';

export const PlacesList = ({ data }: any) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event: any) => {
    setSearchValue(event.target.value);
  };
  const filteredData: any =
    searchValue !== '' && typeof data !== 'undefined'
      ? data.filter((dataEl: any) => dataEl.name.includes(searchValue))
      : data;

  return (
    <div>
      <input
        type="text"
        style={{
          marginBottom: '10px',
          width: '62vw',
          height: '4vh',
          border: '1px solid #4d4d4d',
          borderRadius: '8px'
        }}
        value={searchValue}
        onChange={handleSearch}
      />
      {filteredData.map((dataEl: any) => (
        <PlaceCard data={dataEl} />
      ))}
    </div>
  );
};
