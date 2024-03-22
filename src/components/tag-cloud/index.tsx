import { FunctionComponent, Key } from 'react';
import { TCategory } from '../../@types/models/category';

type TagCloudPrps = {
  categories: TCategory[];
};

export const TagCloud: FunctionComponent<TagCloudPrps> = ({ categories }): JSX.Element => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '10px',
        justifyItems: 'center'
      }}
    >
      {categories.map((category: TCategory, index: number) => (
        <span
          key={category.id}
          style={{
            cursor: 'pointer',
            border: '1px solid #000'
          }}
          onClick={() => console.log(`Clicked on ${category.title}`)}
        >
          {category.title}
        </span>
      ))}
    </div>
  );
};
