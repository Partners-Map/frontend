import { FunctionComponent, useEffect, useState } from 'react';
import { TPartner } from '../../@types/models/partner';
import { useGetPartnersQuery } from '../../__data__/services/partners';

export const PartnerForm: FunctionComponent = (): JSX.Element => {
  const { data: partners } = useGetPartnersQuery();
  const firstPartner = (partners || [])[0];
  const [isSelectedId, setIsSelectedId] = useState<string>('');
  const handlerSelectPartner = (partner: TPartner): void => {
    setIsSelectedId(partner.id);
    console.log(partner);
  };

  useEffect(() => {
    if (firstPartner) {
      setIsSelectedId(firstPartner.id);
    }
  }, [firstPartner, partners]);

  return (
    <div
      style={{
        marginTop: '10vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #000',
        padding: '4vh'
      }}
    >
      {partners ? (
        <ul
          style={{
            listStyle: 'none',
            maxHeight: '40vh',
            overflowY: 'auto'
          }}
        >
          {partners.map(partner => (
            <li
              key={partner.id}
              style={{
                padding: '1vh',
                backgroundColor: isSelectedId === partner.id ? '#007702' : '#858585'
              }}
              onClick={() => handlerSelectPartner(partner)}
            >
              {partner.name}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
      <button
        style={{
          width: '100%',
          marginTop: '2vh',
          padding: '1vh'
        }}
      >
        Создать нового партнера
      </button>
    </div>
  );
};
