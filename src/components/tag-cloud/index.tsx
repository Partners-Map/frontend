import { FunctionComponent } from 'react';
import { TCategory } from '../../@types/models/category';
import { TagCloudContainerS, TagS } from '../../styles/tag-cloud';

type TagCloudPrps = {
  categories: TCategory[];
};

export const TagCloud: FunctionComponent<TagCloudPrps> = ({ categories }): JSX.Element => {
  return (
    <TagCloudContainerS>
      {categories.map((category: TCategory) => (
        <TagS key={category.id} onClick={() => console.log(`Clicked on ${category.title}`)}>
          {category.title}
        </TagS>
      ))}
    </TagCloudContainerS>
  );
};
