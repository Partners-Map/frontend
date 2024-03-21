import { FunctionComponent } from 'react';
import { useGetDiscountsQuery } from '../../__data__/services/discount';

export const DiscountFrom: FunctionComponent = (): JSX.Element => {
  const { data: discounts } = useGetDiscountsQuery();

  return (
    <div
      style={{
        marginTop: '10vh',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #000',
        padding: '4vh',
        width: '60vw'
      }}
    >
      {discounts ? (
        <ul
          style={{
            listStyle: 'none',
            maxHeight: '40vh',
            overflowY: 'auto'
          }}
        >
          {discounts.map((discount, index) => (
            <li
              key={discount.id}
              style={{
                padding: '1vh',
                backgroundColor: '#488a61',
                marginBottom: index === discounts.length - 1 ? 'none' : '1vh'
              }}
            >
              {discount.conditions.map(condition => (
                <p>{condition}</p>
              ))}
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
        Создать новую скидку
      </button>
    </div>
  );
};
