import { FunctionComponent } from 'react';

export const TagCloud: FunctionComponent = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '10px',
        justifyItems: 'center'
      }}
    >
      {tagsData.map((tag, index) => (
        <span
          key={index}
          style={{
            fontSize: `${tag.weight * 10}px`, // Увеличиваем размер шрифта в зависимости от веса
            cursor: 'pointer'
          }}
          onClick={() => console.log(`Clicked on ${tag.text}`)}
        >
          {tag.text}
        </span>
      ))}
    </div>
  );
};
