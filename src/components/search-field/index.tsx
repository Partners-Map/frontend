export const SearchField = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <input
        type='text'
        style={{
          width: '20vw'
        }}
      />
      <button>поиск</button>
    </div>
  );
};
