export const PlaceCard = ({ data }: any) => {
  return (
    <div
      style={{
        backgroundColor: '#1f1f1f11',
        width: '60vw',
        padding: '0.5rem',
        borderRadius: '10px',
        marginBottom: '10px'
      }}
    >
      <h2
        style={{
          margin: '4px'
        }}
      >
        {data?.name}
      </h2>
      {data?.conditions.map((cond: any, index: number) => (
        <h3
          style={{
            margin: '2px'
          }}
        >{`${index + 1}. ${cond} `}</h3>
      ))}
      <h3
        style={{
          margin: '4px'
        }}
      >
        {data?.description ? data?.description : 'нет доп. инф.'}
      </h3>
      <h3
        style={{
          margin: '2px'
        }}
      >{`г. ${data?.Address?.city} ул. ${data?.Address?.street} д. ${data?.Address?.house}`}</h3>
    </div>
  );
};
